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
        question: "What is the capital of France?",
        correctAnswer: "Paris",
      },
      {
        id: 2,
        question: "What is the largest planet in our solar system?",
        correctAnswer: "Jupiter",
      },
      {
        id: 3,
        question: "Who painted the Mona Lisa?",
        correctAnswer: "Leonardo da Vinci",
      },
      {
        id: 4,
        question: "What is the chemical symbol for gold?",
        correctAnswer: "Au",
      },
      {
        id: 5,
        question: "In what year did World War II end?",
        correctAnswer: "1945",
      },
      {
        id: 6,
        question: "What is the smallest prime number?",
        correctAnswer: "2",
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
