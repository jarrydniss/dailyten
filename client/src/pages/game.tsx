import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Check, X, Play } from "lucide-react";
import type { Question, GameResult } from "@shared/schema";

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const { data: questions, isLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions"],
    enabled: gameStarted,
  });

  const submitGameMutation = useMutation({
    mutationFn: async (answers: Record<number, string>) => {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) throw new Error("Failed to submit");
      return response.json();
    },
    onSuccess: (data: GameResult) => {
      setGameResult(data);
      setShowResults(true);
    },
  });

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleNextQuestion = () => {
    if (!questions || currentQuestionIndex >= questions.length - 1) return;
    
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: currentAnswer.trim(),
    }));
    setCurrentAnswer("");
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleSubmitGame = () => {
    if (!questions) return;
    
    const finalAnswers = {
      ...answers,
      [questions[currentQuestionIndex].id]: currentAnswer.trim(),
    };
    
    submitGameMutation.mutate(finalAnswers);
  };

  const handleRestart = () => {
    setGameStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCurrentAnswer("");
    setShowResults(false);
    setGameResult(null);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-3" data-testid="text-title">
              Daily Trivia
            </h1>
            <p className="text-muted-foreground text-base" data-testid="text-subtitle">
              Test your knowledge with 6 questions
            </p>
          </div>
          <Button
            size="lg"
            className="w-full h-12 text-base font-semibold"
            onClick={handleStart}
            data-testid="button-start"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Game
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="text-center">
          <div className="animate-pulse text-muted-foreground" data-testid="text-loading">
            Loading questions...
          </div>
        </div>
      </div>
    );
  }

  if (showResults && gameResult) {
    const percentage = Math.round((gameResult.score / gameResult.total) * 100);
    
    return (
      <div className="min-h-screen py-8 px-4 bg-background">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3" data-testid="text-results-title">
              Game Complete!
            </h2>
            <div className="mb-2">
              <div className="text-5xl font-bold text-primary mb-1" data-testid="text-score">
                {gameResult.score}/{gameResult.total}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide" data-testid="text-percentage">
                {percentage}% Correct
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {gameResult.results.map((result, index) => (
              <Card
                key={result.questionId}
                className="p-4"
                data-testid={`card-result-${index}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {result.isCorrect ? (
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center" data-testid={`icon-correct-${index}`}>
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-destructive flex items-center justify-center" data-testid={`icon-incorrect-${index}`}>
                        <X className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground mb-2" data-testid={`text-question-${index}`}>
                      {result.question}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-muted-foreground flex-shrink-0">Your answer:</span>
                        <span 
                          className={result.isCorrect ? "text-green-600 font-medium" : "text-destructive font-medium"}
                          data-testid={`text-user-answer-${index}`}
                        >
                          {result.userAnswer || "(no answer)"}
                        </span>
                      </div>
                      {!result.isCorrect && (
                        <div className="flex items-start gap-2">
                          <span className="text-muted-foreground flex-shrink-0">Correct:</span>
                          <span className="text-green-600 font-medium" data-testid={`text-correct-answer-${index}`}>
                            {result.correctAnswer}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button
            size="lg"
            className="w-full h-12 text-base font-semibold"
            onClick={handleRestart}
            data-testid="button-play-again"
          >
            Play Again
          </Button>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-muted-foreground">
          No questions available
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = currentAnswer.trim().length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-background">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wide font-semibold text-muted-foreground" data-testid="text-progress">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              data-testid="progress-bar"
            />
          </div>
        </div>

        <Card className="p-6 mb-6 shadow-lg" data-testid="card-question">
          <h2 className="text-xl font-semibold text-foreground mb-6 leading-relaxed" data-testid="text-question">
            {currentQuestion.question}
          </h2>
          
          <Input
            type="text"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canProceed) {
                if (isLastQuestion) {
                  handleSubmitGame();
                } else {
                  handleNextQuestion();
                }
              }
            }}
            placeholder="Type your answer..."
            className="h-12 text-base"
            autoFocus
            data-testid="input-answer"
          />
        </Card>

        {isLastQuestion ? (
          <Button
            size="lg"
            className="w-full h-12 text-base font-semibold"
            onClick={handleSubmitGame}
            disabled={!canProceed || submitGameMutation.isPending}
            data-testid="button-submit"
          >
            {submitGameMutation.isPending ? "Submitting..." : "Submit Game"}
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full h-12 text-base font-semibold"
            onClick={handleNextQuestion}
            disabled={!canProceed}
            data-testid="button-next"
          >
            Next Question
          </Button>
        )}
      </div>
    </div>
  );
}
