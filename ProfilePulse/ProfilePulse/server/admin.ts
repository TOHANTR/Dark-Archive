import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';
import { createLog } from './logging';

// Admin authentication middleware
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const { username, password, code } = req.body;
  
  // Check credentials
  if (username !== 'tohan' || password !== 'Tohan.tr_1061' || code !== '258061') {
    return res.status(401).json({ message: 'Geçersiz kimlik bilgileri' });
  }
  
  // Log successful login
  createLog('Admin Girişi', 'Admin girişi yapıldı').catch(err => {
    console.error('Log creation error:', err);
  });
  
  next();
};

// Generate a random 10-digit folder ID
export const generateFolderId = (): string => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

// File handling utilities
export const isValidFileType = (type: string, file: Express.Multer.File): boolean => {
  const mimeType = file.mimetype;
  
  if (type === 'image') {
    return mimeType.startsWith('image/');
  } else if (type === 'video') {
    return mimeType.startsWith('video/');
  } else if (type === 'audio') {
    return mimeType.startsWith('audio/');
  }
  
  return false;
};

// Clean up file names for storage
export const sanitizeFileName = (fileName: string): string => {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-');
};
