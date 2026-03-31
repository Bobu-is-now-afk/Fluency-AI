
import { Dexie, type Table } from 'dexie';
import { AnalysisMetrics } from '../types';

/**
 * Local database for storing all fluency coaching sessions.
 * Dexie provides a clean indexedDB wrapper for high-performance browser storage.
 */
export class FluencyDatabase extends Dexie {
  sessions!: Table<AnalysisMetrics>;

  constructor() {
    super('FluencyCoachDB');
    // Initialize the database schema with versioning
    // Fix: Explicitly casting to Dexie instance to resolve inheritance property recognition issues
    (this as Dexie).version(1).stores({
      // Primary key is 'id'. We index 'date' and 'userId' for quick history lookups.
      sessions: 'id, date, userId, language, ielts_score'
    });
  }
}

export const db = new FluencyDatabase();

/**
 * Saves a completed session report to local storage.
 */
export const saveBattleReport = async (report: AnalysisMetrics) => {
  try {
    await db.sessions.put(report);
    return report.id;
  } catch (error) {
    console.error("Local DB Save Error:", error);
    throw error;
  }
};

/**
 * Fetches user session history from local storage.
 */
export const getUserHistory = async (uid: string): Promise<AnalysisMetrics[]> => {
  try {
    // Sort by date descending
    return await db.sessions
      .where('userId')
      .equals(uid)
      .reverse()
      .sortBy('date');
  } catch (error) {
    console.error("Local DB Fetch Error:", error);
    return [];
  }
};

/**
 * Deletes a session from local storage.
 */
export const deleteSessionRecord = async (sessionId: string) => {
  try {
    await db.sessions.delete(sessionId);
  } catch (error) {
    console.error("Local DB Delete Error:", error);
  }
};
