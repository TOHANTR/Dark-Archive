import type { Express, Request, Response } from "express";
import express from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { storage } from "./storage";
import { adminAuth, generateFolderId, isValidFileType, sanitizeFileName } from "./admin";
import { createLog } from "./logging";
import { 
  insertProfileSchema, 
  adminLoginSchema 
} from "@shared/schema";

// Configure multer for in-memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

const ensureMediaDirectory = async () => {
  const mediaDir = path.join(process.cwd(), 'media');
  try {
    await fs.mkdir(mediaDir, { recursive: true });
  } catch (error) {
    console.error('Error creating media directory:', error);
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Ensure media directory exists
  await ensureMediaDirectory();

  // Admin login route
  app.post("/api/admin/login", async (req: Request, res: Response) => {
    try {
      // Validate login data
      const validatedData = adminLoginSchema.parse(req.body);
      
      // Check credentials
      if (
        validatedData.username === 'tohan' && 
        validatedData.password === 'Tohan.tr_1061' && 
        validatedData.code === '258061'
      ) {
        await createLog('Admin Girişi', 'Admin girişi yapıldı');
        return res.status(200).json({ message: 'Giriş başarılı' });
      }
      
      return res.status(401).json({ message: 'Geçersiz kimlik bilgileri' });
    } catch (error) {
      return res.status(400).json({ message: 'Geçersiz istek formatı', error });
    }
  });

  // Get all profiles
  app.get("/api/profiles", async (req: Request, res: Response) => {
    try {
      const profiles = await storage.getProfiles();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: 'Profiller alınırken hata oluştu' });
    }
  });

  // Search profiles
  app.get("/api/profiles/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string || '';
      const profiles = await storage.searchProfiles(query);
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: 'Arama sırasında hata oluştu' });
    }
  });

  // Get profile by ID
  app.get("/api/profiles/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const profile = await storage.getProfile(id);
      
      if (!profile) {
        return res.status(404).json({ message: 'Profil bulunamadı' });
      }
      
      const media = await storage.getMediaByProfileId(id);
      
      res.json({
        profile,
        media
      });
    } catch (error) {
      res.status(500).json({ message: 'Profil alınırken hata oluştu' });
    }
  });

  // Create new profile
  app.post(
    "/api/profiles", 
    upload.single('coverImage'),
    async (req: Request, res: Response) => {
      try {
        if (!req.file) {
          return res.status(400).json({ message: 'Kapak resmi gereklidir' });
        }
        
        // Generate folder ID
        const folderId = generateFolderId();
        const folderPath = path.join(process.cwd(), 'media', folderId);
        
        // Create folder
        await fs.mkdir(folderPath, { recursive: true });
        
        // Save cover image
        const fileName = `cover-${sanitizeFileName(req.file.originalname)}`;
        const filePath = path.join(folderPath, fileName);
        await fs.writeFile(filePath, req.file.buffer);
        
        // Create profile
        const profile = await storage.createProfile({
          name: req.body.name,
          about: req.body.about || null,
          folderId,
          coverImage: `/media/${folderId}/${fileName}`
        });
        
        // Log profile creation
        await createLog('Yeni Profil', `${profile.name} profili oluşturuldu (ID: ${folderId})`);
        
        res.status(201).json({
          profile,
          folderId
        });
      } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ message: 'Profil oluşturulurken hata oluştu' });
      }
    }
  );

  // Add media to profile
  app.post(
    "/api/profiles/:id/media",
    upload.array('files', 10),
    async (req: Request, res: Response) => {
      try {
        const profileId = parseInt(req.params.id);
        const mediaType = req.body.type; // 'image', 'video', or 'audio'
        
        if (!['image', 'video', 'audio'].includes(mediaType)) {
          return res.status(400).json({ message: 'Geçersiz medya tipi' });
        }
        
        const profile = await storage.getProfile(profileId);
        if (!profile) {
          return res.status(404).json({ message: 'Profil bulunamadı' });
        }
        
        const folderPath = path.join(process.cwd(), 'media', profile.folderId);
        const files = req.files as Express.Multer.File[];
        
        if (!files || files.length === 0) {
          return res.status(400).json({ message: 'Dosya yüklenmedi' });
        }
        
        const mediaFiles = [];
        
        for (const file of files) {
          if (!isValidFileType(mediaType, file)) {
            continue; // Skip invalid file types
          }
          
          const fileName = `${mediaType}-${Date.now()}-${sanitizeFileName(file.originalname)}`;
          const filePath = path.join(folderPath, fileName);
          
          await fs.writeFile(filePath, file.buffer);
          
          const media = await storage.createMedia({
            profileId,
            type: mediaType,
            path: `/media/${profile.folderId}/${fileName}`
          });
          
          mediaFiles.push(media);
        }
        
        // Log media addition
        await createLog(
          'Medya Ekleme',
          `${mediaFiles.length} ${mediaType} eklendi (ID: ${profile.folderId})`
        );
        
        res.status(201).json(mediaFiles);
      } catch (error) {
        console.error('Error adding media:', error);
        res.status(500).json({ message: 'Medya eklenirken hata oluştu' });
      }
    }
  );

  // Get logs
  app.get("/api/logs", async (req: Request, res: Response) => {
    try {
      const logs = await storage.getLogs();
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: 'Loglar alınırken hata oluştu' });
    }
  });
  
  // Get all pages
  app.get("/api/pages", async (req: Request, res: Response) => {
    try {
      const pages = await storage.getPages();
      res.json(pages);
    } catch (error) {
      res.status(500).json({ message: 'Sayfalar alınırken hata oluştu' });
    }
  });
  
  // Get page by slug
  app.get("/api/pages/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;
      const page = await storage.getPageBySlug(slug);
      
      if (!page) {
        return res.status(404).json({ message: 'Sayfa bulunamadı' });
      }
      
      res.json(page);
    } catch (error) {
      res.status(500).json({ message: 'Sayfa alınırken hata oluştu' });
    }
  });
  
  // Update page by id (admin only)
  app.put("/api/pages/:id", adminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const pageData = req.body;
      
      const updatedPage = await storage.updatePage(id, pageData);
      
      if (!updatedPage) {
        return res.status(404).json({ message: 'Sayfa bulunamadı' });
      }
      
      // Log page update
      await createLog('Sayfa Güncelleme', `${updatedPage.title} sayfası güncellendi`);
      
      res.json(updatedPage);
    } catch (error) {
      res.status(500).json({ message: 'Sayfa güncellenirken hata oluştu' });
    }
  });
  
  // Get site statistics
  app.get("/api/stats", async (req: Request, res: Response) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: 'İstatistikler alınırken hata oluştu' });
    }
  });
  
  // Get all submissions (admin only)
  app.get("/api/submissions", adminAuth, async (req: Request, res: Response) => {
    try {
      const submissions = await storage.getSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: 'Başvurular alınırken hata oluştu' });
    }
  });
  
  // Get submission by id (admin only)
  app.get("/api/submissions/:id", adminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const submission = await storage.getSubmission(id);
      
      if (!submission) {
        return res.status(404).json({ message: 'Başvuru bulunamadı' });
      }
      
      res.json(submission);
    } catch (error) {
      res.status(500).json({ message: 'Başvuru alınırken hata oluştu' });
    }
  });
  
  // Create new submission
  app.post(
    "/api/submissions", 
    upload.single('file'),
    async (req: Request, res: Response) => {
      try {
        if (!req.file) {
          return res.status(400).json({ message: 'Dosya gereklidir' });
        }
        
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
          return res.status(400).json({ message: 'Tüm alanlar gereklidir' });
        }
        
        // Create folder for submissions if it doesn't exist
        const submissionsPath = path.join(process.cwd(), 'submissions');
        await fs.mkdir(submissionsPath, { recursive: true });
        
        // Save file
        const fileName = `${Date.now()}-${sanitizeFileName(req.file.originalname)}`;
        const filePath = path.join(submissionsPath, fileName);
        await fs.writeFile(filePath, req.file.buffer);
        
        // Get IP address and user agent
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        
        // Create submission
        const submission = await storage.createSubmission({
          name,
          email,
          message,
          fileName: req.file.originalname,
          filePath: `/submissions/${fileName}`,
          fileSize: req.file.size,
          ipAddress: ipAddress.toString(),
          userAgent: userAgent.toString(),
          location: '' // This would need to be determined with a geolocation service
        });
        
        res.status(201).json({
          success: true,
          message: 'Başvurunuz alınmıştır. En kısa sürede incelenecektir.'
        });
      } catch (error) {
        console.error('Error creating submission:', error);
        res.status(500).json({ message: 'Başvuru gönderilirken hata oluştu' });
      }
    }
  );
  
  // Update submission status (admin only)
  app.put("/api/submissions/:id/status", adminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Geçersiz durum' });
      }
      
      const updatedSubmission = await storage.updateSubmissionStatus(id, status);
      
      if (!updatedSubmission) {
        return res.status(404).json({ message: 'Başvuru bulunamadı' });
      }
      
      res.json(updatedSubmission);
    } catch (error) {
      res.status(500).json({ message: 'Başvuru durumu güncellenirken hata oluştu' });
    }
  });

  // Serve media files
  app.use('/media', express.static(path.join(process.cwd(), 'media')));
  
  // Serve submission files (admin only)
  app.use('/submissions', adminAuth, express.static(path.join(process.cwd(), 'submissions')));

  const httpServer = createServer(app);
  return httpServer;
}
