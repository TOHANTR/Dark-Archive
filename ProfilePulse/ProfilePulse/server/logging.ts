import { storage } from './storage';
import { InsertLog } from '@shared/schema';

// Create a new log entry
export const createLog = async (action: string, details: string): Promise<void> => {
  const logEntry: InsertLog = {
    action,
    details
  };
  
  try {
    await storage.createLog(logEntry);
  } catch (error) {
    console.error('Error creating log entry:', error);
    throw error;
  }
};
