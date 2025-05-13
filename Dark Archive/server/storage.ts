import { 
  User, InsertUser, 
  Profile, InsertProfile, 
  Media, InsertMedia, 
  Log, InsertLog,
  Page, InsertPage,
  Submission, InsertSubmission
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Profile operations
  getProfiles(): Promise<Profile[]>;
  getProfile(id: number): Promise<Profile | undefined>;
  getProfileByFolderId(folderId: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  
  // Media operations
  getMediaByProfileId(profileId: number): Promise<Media[]>;
  createMedia(media: InsertMedia): Promise<Media>;
  
  // Log operations
  getLogs(): Promise<Log[]>;
  createLog(log: InsertLog): Promise<Log>;
  
  // Search operations
  searchProfiles(query: string): Promise<Profile[]>;
  
  // Page operations
  getPages(): Promise<Page[]>;
  getPage(id: number): Promise<Page | undefined>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: number, page: Partial<InsertPage>): Promise<Page | undefined>;
  
  // Stats operations
  getStats(): Promise<{
    profileCount: number;
    imageCount: number;
    videoCount: number;
    audioCount: number;
  }>;
  
  // Submission operations
  getSubmissions(): Promise<Submission[]>;
  getSubmission(id: number): Promise<Submission | undefined>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  updateSubmissionStatus(id: number, status: string): Promise<Submission | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private profiles: Map<number, Profile>;
  private media: Map<number, Media>;
  private logs: Map<number, Log>;
  private pages: Map<number, Page>;
  private submissions: Map<number, Submission>;
  
  private userId: number;
  private profileId: number;
  private mediaId: number;
  private logId: number;
  private pageId: number;
  private submissionId: number;

  constructor() {
    this.users = new Map();
    this.profiles = new Map();
    this.media = new Map();
    this.logs = new Map();
    this.pages = new Map();
    this.submissions = new Map();
    
    this.userId = 1;
    this.profileId = 1;
    this.mediaId = 1;
    this.logId = 1;
    this.pageId = 1;
    this.submissionId = 1;
    
    // Create default admin user
    this.createUser({
      username: "tohan",
      password: "Tohan.tr_1061" // In a real app, this would be hashed
    });
    
    // Create default pages
    this.createDefaultPages();
  }
  
  private async createDefaultPages() {
    // About page
    await this.createPage({
      slug: "about",
      title: "Hakkında",
      content: "<h2>Dark Archive Hakkında</h2><p>Dark Archive, değerli dijital içerikleri koruma ve gelecek nesillere aktarma misyonuyla kurulmuş bir dijital arşivleme platformudur.</p>",
      metaDescription: "Dark Archive hakkında bilgi. Misyonumuz, vizyonumuz ve tarihçemiz.",
      statistics: {
        profileCount: 0,
        imageCount: 0,
        videoCount: 0,
        audioCount: 0
      }
    });
    
    // Upload page
    await this.createPage({
      slug: "upload",
      title: "Dosya Gönder",
      content: "<h2>Arşivimize Katkıda Bulunun</h2><p>Sizde arşivimize katkıda bulunmak istiyorsanız, aşağıdaki formu doldurarak dosyalarınızı bize gönderebilirsiniz.</p>",
      metaDescription: "Dark Archive'e dosya gönderin. Arşivimize katkıda bulunun."
    });
    
    // Contact page
    await this.createPage({
      slug: "contact",
      title: "İletişim",
      content: "<h2>Bizimle İletişime Geçin</h2><p>Dark Archive ile ilgili sorularınız veya önerileriniz için bizimle iletişime geçebilirsiniz: info@darkarchive.com</p>",
      metaDescription: "Dark Archive iletişim bilgileri."
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Profile operations
  async getProfiles(): Promise<Profile[]> {
    return Array.from(this.profiles.values());
  }
  
  async getProfile(id: number): Promise<Profile | undefined> {
    return this.profiles.get(id);
  }
  
  async getProfileByFolderId(folderId: string): Promise<Profile | undefined> {
    return Array.from(this.profiles.values()).find(
      (profile) => profile.folderId === folderId
    );
  }
  
  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = this.profileId++;
    const profile: Profile = { 
      ...insertProfile, 
      id,
      about: insertProfile.about || null,
      createdAt: new Date() 
    };
    this.profiles.set(id, profile);
    
    // Update statistics after adding a new profile
    await this.updateStats();
    
    return profile;
  }
  
  // Media operations
  async getMediaByProfileId(profileId: number): Promise<Media[]> {
    return Array.from(this.media.values()).filter(
      (media) => media.profileId === profileId
    );
  }
  
  async createMedia(insertMedia: InsertMedia): Promise<Media> {
    const id = this.mediaId++;
    const media: Media = { 
      ...insertMedia, 
      id,
      createdAt: new Date() 
    };
    this.media.set(id, media);
    
    // Update statistics after adding new media
    await this.updateStats();
    
    return media;
  }
  
  // Page operations
  async getPages(): Promise<Page[]> {
    return Array.from(this.pages.values());
  }
  
  async getPage(id: number): Promise<Page | undefined> {
    return this.pages.get(id);
  }
  
  async getPageBySlug(slug: string): Promise<Page | undefined> {
    return Array.from(this.pages.values()).find(
      (page) => page.slug === slug
    );
  }
  
  async createPage(insertPage: InsertPage): Promise<Page> {
    const id = this.pageId++;
    const page: Page = {
      ...insertPage,
      id,
      updatedAt: new Date()
    };
    this.pages.set(id, page);
    return page;
  }
  
  async updatePage(id: number, updateData: Partial<InsertPage>): Promise<Page | undefined> {
    const page = this.pages.get(id);
    if (!page) return undefined;
    
    const updatedPage: Page = {
      ...page,
      ...updateData,
      id,
      updatedAt: new Date()
    };
    
    this.pages.set(id, updatedPage);
    return updatedPage;
  }
  
  // Stats operations
  async getStats(): Promise<{ profileCount: number; imageCount: number; videoCount: number; audioCount: number; }> {
    const profiles = Array.from(this.profiles.values());
    const media = Array.from(this.media.values());
    
    const stats = {
      profileCount: profiles.length,
      imageCount: media.filter(m => m.type === 'image').length,
      videoCount: media.filter(m => m.type === 'video').length,
      audioCount: media.filter(m => m.type === 'audio').length
    };
    
    return stats;
  }
  
  private async updateStats(): Promise<void> {
    // Get current stats
    const stats = await this.getStats();
    
    // Update stats in about page
    const aboutPage = await this.getPageBySlug('about');
    if (aboutPage) {
      await this.updatePage(aboutPage.id, {
        statistics: stats
      });
    }
  }
  
  // Log operations
  async getLogs(): Promise<Log[]> {
    return Array.from(this.logs.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async createLog(insertLog: InsertLog): Promise<Log> {
    const id = this.logId++;
    const log: Log = { 
      ...insertLog, 
      id,
      createdAt: new Date() 
    };
    this.logs.set(id, log);
    return log;
  }
  
  // Search operations
  async searchProfiles(query: string): Promise<Profile[]> {
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    return Array.from(this.profiles.values()).filter(
      (profile) => profile.name.toLowerCase().includes(lowerQuery)
    );
  }
  
  // Submission operations
  async getSubmissions(): Promise<Submission[]> {
    return Array.from(this.submissions.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async getSubmission(id: number): Promise<Submission | undefined> {
    return this.submissions.get(id);
  }
  
  async createSubmission(insertSubmission: InsertSubmission): Promise<Submission> {
    const id = this.submissionId++;
    const submission: Submission = {
      ...insertSubmission,
      id,
      status: 'pending',
      createdAt: new Date()
    };
    this.submissions.set(id, submission);
    
    // Log new submission
    await this.createLog({
      action: 'Yeni Başvuru',
      details: `${submission.name} tarafından yeni bir dosya gönderildi`
    });
    
    return submission;
  }
  
  async updateSubmissionStatus(id: number, status: string): Promise<Submission | undefined> {
    const submission = this.submissions.get(id);
    if (!submission) return undefined;
    
    const updatedSubmission: Submission = {
      ...submission,
      status
    };
    
    this.submissions.set(id, updatedSubmission);
    
    // Log status update
    await this.createLog({
      action: 'Başvuru Güncelleme',
      details: `${submission.name} tarafından gönderilen başvuru ${status} olarak güncellendi`
    });
    
    return updatedSubmission;
  }
}

export const storage = new MemStorage();
