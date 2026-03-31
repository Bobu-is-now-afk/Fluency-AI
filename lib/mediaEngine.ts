
/**
 * Standardizes the user identification for local sessions.
 */
export const getAnonymousUserId = (): string => {
  let id = localStorage.getItem('fluency_coach_anon_id');
  if (!id) {
    id = `local_user_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('fluency_coach_anon_id', id);
  }
  return id;
};

/**
 * Converts a MediaRecorder blob to a Base64 string for direct Gemini API processing.
 * This is the preferred method for high-performance client-side AI apps.
 */
export const processRecordingBlob = async (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (result && result.includes(',')) {
        const base64String = result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error("Failed to convert blob to base64"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
