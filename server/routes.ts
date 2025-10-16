import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const submitAnswersSchema = z.object({
  answers: z.record(z.string()),
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/questions", async (_req, res) => {
    try {
      const questions = await storage.getQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  app.post("/api/submit", async (req, res) => {
    try {
      const { answers } = submitAnswersSchema.parse(req.body);
      
      const answersAsNumbers: Record<number, string> = {};
      for (const [key, value] of Object.entries(answers)) {
        answersAsNumbers[parseInt(key)] = value;
      }
      
      const result = await storage.submitAnswers(answersAsNumbers);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data" });
      } else {
        res.status(500).json({ error: "Failed to submit answers" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
