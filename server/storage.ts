import type { Question, GameResult, ResultItem } from "@shared/schema";

export interface IStorage {
  getQuestions(): Promise<Question[]>;
  submitAnswers(answers: Record<number, string>): Promise<GameResult>;
}

export class MemStorage implements IStorage {
  private questions: Question[];

  constructor() {
    this.questions = [
      {
        id: 1,
        question: "Who won the Premier League in 2017–18?",
        correctAnswer: "Manchester City",
      },
      {
        id: 2,
        question: "Who won the Premier League in 2018–19?",
        correctAnswer: "Manchester City",
      },
      {
        id: 3,
        question: "Who won the Premier League in 2020–21?",
        correctAnswer: "Manchester City",
      },
      {
        id: 4,
        question: "Who won the Premier League in 2021–22?",
        correctAnswer: "Manchester City",
      },
      {
        id: 5,
        question: "Who won the Premier League in 2022–23?",
        correctAnswer: "Manchester City",
      },
      {
        id: 6,
        question: "Who won the Premier League in 2023–24?",
        correctAnswer: "Manchester City",
      },
    ];
  }

  async getQuestions(): Promise<Question[]> {
    return this.questions;
  }

  async submitAnswers(answers: Record<number, string>): Promise<GameResult> {
    const results: ResultItem[] = [];
    let score = 0;

    for (const question of this.questions) {
      const userAnswer = answers[question.id] || "";
      const isCorrect = this.compareAnswers(userAnswer, question.correctAnswer);
      
      if (isCorrect) {
        score++;
      }

      results.push({
        questionId: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
      });
    }

    return {
      score,
      total: this.questions.length,
      results,
    };
  }

  private compareAnswers(userAnswer: string, correctAnswer: string): boolean {
    const normalize = (str: string) => 
      str.toLowerCase().trim().replace(/[^\w\s]/g, "");
    
    return normalize(userAnswer) === normalize(correctAnswer);
  }
}

export const storage = new MemStorage();
