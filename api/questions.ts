// api/questions.ts
// Minimal Vercel serverless function exposing GET /api/questions
import { storage } from "./storage";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const questions = await storage.getQuestions();
    res.status(200).json(questions);
  } catch (err) {
    console.error("api/questions error:", err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
}
