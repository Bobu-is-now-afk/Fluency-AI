import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaceMetrics } from '../types';

declare const FaceMesh: unknown;
declare const drawConnectors: unknown;
declare const FACEMESH_TESSELATION: unknown;
declare const FACEMESH_RIGHT_EYE: unknown;
declare const FACEMESH_LEFT_EYE: unknown;

let globalFaceMesh: unknown = null;
let globalInitPromise: Promise<unknown> | null = null;

export const useFaceMesh = (
  videoRef: React.RefObject<HTMLVideoElement | null>, 
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  active: boolean,
  stream: MediaStream | null,
  onModelReady?: () => void
) => {
  const [metrics, setMetrics] = useState<FaceMetrics>({
    isSmiling: false,
    hasEyeContact: true,
    pitch: 0,
    yaw: 0,
    smileIntensity: 0
  });

  const isMountedRef = useRef<boolean>(true);
  const animationFrameRef = useRef<number | null>(null);
  const readySignaledRef = useRef<boolean>(false);
  const activeRef = useRef<boolean>(false);
  const loopIdRef = useRef<number>(0);
  
  // Moving Average Buffer
  const bufferRef = useRef<FaceMetrics[]>([]);
  const BUFFER_SIZE = 10;
  
  const YAW_THRESHOLD = 0.15;
  const PITCH_THRESHOLD = 0.20;

  const onResults = useCallback((results: { multiFaceLandmarks: { x: number; y: number; z: number }[][] }) => {
    if (!isMountedRef.current || !activeRef.current) return;

    const canvasElement = canvasRef.current;
    const videoElement = videoRef.current;
    if (!canvasElement || !videoElement || videoElement.videoWidth === 0) return;

    const canvasCtx = canvasElement.getContext('2d', { alpha: true });
    if (!canvasCtx) return;

    if (canvasElement.width !== videoElement.videoWidth || canvasElement.height !== videoElement.videoHeight) {
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
    }

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.translate(canvasElement.width, 0);
    canvasCtx.scale(-1, 1);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];
      
      if (drawConnectors) {
        (drawConnectors as (c: CanvasRenderingContext2D, l: unknown, t: unknown, s: unknown) => void)(canvasCtx, landmarks, FACEMESH_TESSELATION, { color: 'rgba(99, 102, 241, 0.1)', lineWidth: 0.5 });
        (drawConnectors as (c: CanvasRenderingContext2D, l: unknown, t: unknown, s: unknown) => void)(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, { color: '#6366f1', lineWidth: 1 });
        (drawConnectors as (c: CanvasRenderingContext2D, l: unknown, t: unknown, s: unknown) => void)(canvasCtx, landmarks, FACEMESH_LEFT_EYE, { color: '#6366f1', lineWidth: 1 });
      }

      // Calculate Raw Metrics
      const faceWidth = Math.abs(landmarks[454].x - landmarks[234].x);
      const mouthWidth = Math.sqrt(Math.pow(landmarks[291].x - landmarks[61].x, 2) + Math.pow(landmarks[291].y - landmarks[61].y, 2));
      const rawSmileIntensity = Math.max(0, Math.min(1, (mouthWidth / faceWidth - 0.45) * 5));
      const rawYaw = (landmarks[1].x - (landmarks[234].x + landmarks[454].x) / 2) / faceWidth;
      const rawPitch = (landmarks[1].y - (landmarks[10].y + landmarks[152].y) / 2) / Math.abs(landmarks[152].y - landmarks[10].y);
      const rawHasEyeContact = Math.abs(rawYaw) < YAW_THRESHOLD && Math.abs(rawPitch) < PITCH_THRESHOLD;
      
      const rawMetrics: FaceMetrics = {
        isSmiling: rawSmileIntensity > 0.3,
        hasEyeContact: rawHasEyeContact,
        yaw: rawYaw || 0,
        pitch: rawPitch || 0,
        smileIntensity: rawSmileIntensity || 0
      };

      // Apply Moving Average Filter (10-frame window as requested)
      bufferRef.current.push(rawMetrics);
      if (bufferRef.current.length > BUFFER_SIZE) {
        bufferRef.current.shift();
      }

      const buffer = bufferRef.current;
      const count = buffer.length;

      const smoothed = buffer.reduce((acc, m) => {
        acc.yaw += m.yaw;
        acc.pitch += m.pitch;
        acc.smileIntensity += m.smileIntensity;
        acc.eyeContactCount += m.hasEyeContact ? 1 : 0;
        acc.smileCount += m.isSmiling ? 1 : 0;
        return acc;
      }, { yaw: 0, pitch: 0, smileIntensity: 0, eyeContactCount: 0, smileCount: 0 });

      // Use a slightly higher threshold for booleans to prevent flicker from blinks
      setMetrics({
        yaw: smoothed.yaw / count,
        pitch: smoothed.pitch / count,
        smileIntensity: smoothed.smileIntensity / count,
        hasEyeContact: (smoothed.eyeContactCount / count) >= 0.6, // 60% threshold to resist blinks
        isSmiling: (smoothed.smileCount / count) >= 0.5
      });
    }
    canvasCtx.restore();
  }, [canvasRef, videoRef]);

  useEffect(() => {
    isMountedRef.current = true;
    activeRef.current = active;
    
    if (active) {
      readySignaledRef.current = false;
      // Reset buffer on new activation
      bufferRef.current = [];
    } else {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    const startInference = async () => {
      try {
        if (!globalFaceMesh) {
          if (!globalInitPromise) {
            globalInitPromise = (async () => {
              const fm = new (FaceMesh as unknown as { new (c: unknown): { setOptions: (o: unknown) => void; initialize: () => Promise<void> } })({
                locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
              });
              fm.setOptions({
                maxNumFaces: 1,
                refineLandmarks: true,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
              });
              await fm.initialize();
              return fm;
            })();
          }
          globalFaceMesh = await globalInitPromise;
        }

        if (isMountedRef.current && activeRef.current && !readySignaledRef.current && onModelReady) {
          readySignaledRef.current = true;
          onModelReady();
        }

        (globalFaceMesh as { onResults: (cb: unknown) => void }).onResults(onResults);

        const currentLoopId = ++loopIdRef.current;

        const process = async () => {
          if (!isMountedRef.current || !activeRef.current || currentLoopId !== loopIdRef.current) return;
          
          const video = videoRef.current;
          if (video && video.readyState >= 2 && !video.paused && globalFaceMesh) {
            try {
              await (globalFaceMesh as { send: (input: { image: HTMLVideoElement }) => Promise<void> }).send({ image: video });
            } catch { /* ignore */ }
          }
          
          if (isMountedRef.current && activeRef.current) {
            animationFrameRef.current = requestAnimationFrame(process);
          }
        };

        process();
      } catch (err) {
        console.error("FaceMesh Engine Failure:", err);
      }
    };

    if (active && stream) {
      startInference();
    }

    return () => {
      isMountedRef.current = false;
      activeRef.current = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [active, stream, onResults, onModelReady, videoRef]);

  return metrics;
};