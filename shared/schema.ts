import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const skins = pgTable("skins", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const spins = pgTable("spins", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  skinId: integer("skin_id").references(() => skins.id),
  spinDate: timestamp("spin_date").defaultNow().notNull(),
  claimed: boolean("claimed").default(false).notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSkinSchema = createInsertSchema(skins).pick({
  name: true,
  imageUrl: true,
});

export const insertSpinSchema = createInsertSchema(spins).pick({
  userId: true,
  skinId: true,
  claimed: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSkin = z.infer<typeof insertSkinSchema>;
export type Skin = typeof skins.$inferSelect;

export type InsertSpin = z.infer<typeof insertSpinSchema>;
export type Spin = typeof spins.$inferSelect;
