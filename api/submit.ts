// api/submit.ts
// Minimal Vercel serverless function exposing POST /api/submit
import { storage } from "../server/storage";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const body = req.body ?? {};
    const answers = body.answers ?? {};

    // Convert JSON object keys (strings) into numeric keys expected by storage
    const answersAsNumbers: Record<number, string> = {};
    for (const [key, value] of Object.entries(answers)) {
      const numKey = Number(key);
      if (!Number.isNaN(numKey)) {
        answersAsNumbers[numKey] = typeof value === "string" ? value : String(value ?? "");
      }
    }

    const result = await storage.submitAnswers(answersAsNumbers);
    res.status(200).json(result);
  } catch (err) {
    console.error("api/submit error:", err);
    res.status(500).json({ error: "Failed to submit answers" });
  }
}