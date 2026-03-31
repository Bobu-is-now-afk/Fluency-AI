
import { Dexie, type Table } from 'dexie';
import { AnalysisMetrics } from '../types';

/**
 * Local Browser Database (IndexedDB)
 * Replaces Firestore for 100% private, local persistence.
 */
export class FluencyDB extends Dexie {
  sessions!: Table<AnalysisMetrics>;

  constructor() {
    super('FluencyCoachLocal');
    // Schema definition
    (this as Dexie).version(1).stores({
      sessions: 'id, date, userId, language, ielts_score'
    });
  }
}

export const db = new FluencyDB();

export const StorageService = {
  /**
   * Saves a coaching session locally.
   */
  async saveSession(report: AnalysisMetrics) {
    try {
      await db.sessions.put(report);
      return report.id;
    } catch (error) {
      console.error("Local Save Failed:", error);
      throw error;
    }
  },

  /**
   * Retrieves a single session by ID.
   */
  async getSession(id: string): Promise<AnalysisMetrics | undefined> {
    try {
      return await db.sessions.get(id);
    } catch (error) {
      console.error("Local Fetch Failed:", error);
      return undefined;
    }
  },

  /**
   * Retrieves session history for the current user.
   */
  async getHistory(uid: string): Promise<AnalysisMetrics[]> {
    try {
      return await db.sessions
        .where('userId')
        .equals(uid)
        .reverse()
        .sortBy('date');
    } catch (error) {
      console.error("Local History Fetch Failed:", error);
      return [];
    }
  },

  /**
   * Deletes a record from the browser.
   */
  async deleteSession(id: string) {
    try {
      await db.sessions.delete(id);
    } catch (error) {
      console.error("Local Delete Failed:", error);
    }
  },

  /**
   * Clears all session history for a user.
   */
  async clearHistory(uid: string) {
    try {
      await db.sessions.where('userId').equals(uid).delete();
    } catch (error) {
      console.error("Local Clear Failed:", error);
    }
  },
};
