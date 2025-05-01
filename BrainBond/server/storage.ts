import { users, type User, type InsertUser, skins, type Skin, type InsertSkin, spins, type Spin, type InsertSpin } from "@shared/schema";
import { skinData } from "../client/src/lib/skins";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Skin methods
  getSkin(id: number): Promise<Skin | undefined>;
  getAllSkins(): Promise<Skin[]>;
  createSkin(skin: InsertSkin): Promise<Skin>;
  
  // Spin methods
  getSpin(id: number): Promise<Spin | undefined>;
  getSpinsByUser(userId: number): Promise<Spin[]>;
  createSpin(spin: InsertSpin): Promise<Spin>;
  claimSpin(spinId: number): Promise<Spin | undefined>;
  hasUserSpun(userId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private skins: Map<number, Skin>;
  private spins: Map<number, Spin>;
  
  private currentUserId: number;
  private currentSkinId: number;
  private currentSpinId: number;

  constructor() {
    this.users = new Map();
    this.skins = new Map();
    this.spins = new Map();
    
    this.currentUserId = 1;
    this.currentSkinId = 1;
    this.currentSpinId = 1;
    
    // Populate initial skins data
    this.initializeSkins();
  }
  
  private initializeSkins() {
    skinData.forEach((skin, index) => {
      const id = index + 1;
      this.skins.set(id, {
        id,
        name: skin.name,
        imageUrl: skin.img
      });
    });
    this.currentSkinId = skinData.length + 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getSkin(id: number): Promise<Skin | undefined> {
    return this.skins.get(id);
  }
  
  async getAllSkins(): Promise<Skin[]> {
    return Array.from(this.skins.values());
  }
  
  async createSkin(insertSkin: InsertSkin): Promise<Skin> {
    const id = this.currentSkinId++;
    const skin: Skin = { ...insertSkin, id };
    this.skins.set(id, skin);
    return skin;
  }
  
  async getSpin(id: number): Promise<Spin | undefined> {
    return this.spins.get(id);
  }
  
  async getSpinsByUser(userId: number): Promise<Spin[]> {
    return Array.from(this.spins.values()).filter(
      (spin) => spin.userId === userId,
    );
  }
  
  async createSpin(insertSpin: InsertSpin): Promise<Spin> {
    const id = this.currentSpinId++;
    const spin: Spin = { 
      ...insertSpin, 
      id, 
      spinDate: new Date() 
    };
    this.spins.set(id, spin);
    return spin;
  }
  
  async claimSpin(spinId: number): Promise<Spin | undefined> {
    const spin = this.spins.get(spinId);
    if (!spin) return undefined;
    
    const updatedSpin: Spin = { ...spin, claimed: true };
    this.spins.set(spinId, updatedSpin);
    return updatedSpin;
  }
  
  async hasUserSpun(userId: number): Promise<boolean> {
    return Array.from(this.spins.values()).some(
      (spin) => spin.userId === userId,
    );
  }
}

export const storage = new MemStorage();
