
import { useState, useEffect } from 'react';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  isAnonymous: boolean;
}

/**
 * Mock Auth Hook: Replaces Firebase Authentication for a 100% client-side demo experience.
 * Provides a persistent "Demo User" profile so the UI remains interactive.
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate or retrieve a persistent local ID
    let anonId = localStorage.getItem('fluency_coach_demo_id');
    if (!anonId) {
      anonId = `demo_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem('fluency_coach_demo_id', anonId);
    }

    const demoUser: User = {
      uid: anonId,
      displayName: "Elite Communicator (Demo)",
      email: "demo@fluencycoach.ai",
      isAnonymous: true
    };

    const timer = setTimeout(() => {
      setUser(demoUser);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return { user, loading };
};
