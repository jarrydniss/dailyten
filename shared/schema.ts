import { z } from "zod";

export const questionSchema = z.object({
  id: z.number(),
  question: z.string(),
  correctAnswer: z.string(),
});

export const answerSchema = z.object({
  questionId: z.number(),
  userAnswer: z.string(),
});

export const gameSessionSchema = z.object({
  answers: z.array(answerSchema),
  score: z.number().optional(),
  completed: z.boolean().default(false),
});

export const resultItemSchema = z.object({
  questionId: z.number(),
  question: z.string(),
  userAnswer: z.string(),
  correctAnswer: z.string(),
  isCorrect: z.boolean(),
});

export const gameResultSchema = z.object({
  score: z.number(),
  total: z.number(),
  results: z.array(resultItemSchema),
});

export type Question = z.infer<typeof questionSchema>;
export type Answer = z.infer<typeof answerSchema>;
export type GameSession = z.infer<typeof gameSessionSchema>;
export type ResultItem = z.infer<typeof resultItemSchema>;
export type GameResult = z.infer<typeof gameResultSchema>;
