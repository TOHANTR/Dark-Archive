import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for admin authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Profile schema for the media archive
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  folderId: text("folder_id").notNull().unique(),
  coverImage: text("cover_image").notNull(),
  about: text("about"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProfileSchema = createInsertSchema(profiles).pick({
  name: true,
  folderId: true,
  coverImage: true,
  about: true,
});

// Media schema for storing profile media files
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").notNull(),
  type: text("type").notNull(), // 'image', 'video', 'audio'
  path: text("path").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMediaSchema = createInsertSchema(media).pick({
  profileId: true,
  type: true,
  path: true,
});

// Logs schema for admin actions
export const logs = pgTable("logs", {
  id: serial("id").primaryKey(),
  action: text("action").notNull(),
  details: text("details").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLogSchema = createInsertSchema(logs).pick({
  action: true,
  details: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

export type Media = typeof media.$inferSelect;
export type InsertMedia = z.infer<typeof insertMediaSchema>;

export type Log = typeof logs.$inferSelect;
export type InsertLog = z.infer<typeof insertLogSchema>;

// Submissions schema for user file submissions
export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  fileSize: integer("file_size").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  location: text("location"),
  status: text("status").default("pending").notNull(), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSubmissionSchema = createInsertSchema(submissions).pick({
  name: true,
  email: true,
  message: true,
  fileName: true,
  filePath: true,
  fileSize: true,
  ipAddress: true,
  userAgent: true,
  location: true,
});

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;

// Extended schemas with additional validation
// Pages schema for editable site pages
export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(), // 'about', 'upload', 'contact'
  title: text("title").notNull(),
  content: text("content").notNull(),
  metaDescription: text("meta_description"),
  statistics: json("statistics").$type<{
    profileCount?: number;
    imageCount?: number;
    videoCount?: number;
    audioCount?: number;
    [key: string]: any;
  }>(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPageSchema = createInsertSchema(pages).pick({
  slug: true,
  title: true,
  content: true,
  metaDescription: true,
  statistics: true,
});

export type Page = typeof pages.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Kullanıcı adı gereklidir"),
  password: z.string().min(1, "Şifre gereklidir"),
  code: z.string().length(6, "6 haneli kod gereklidir"),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;
