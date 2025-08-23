export type FlashcardStatus = "not-started" | "completed" | "review";
export type ChallengeStatus =
  | "not-started"
  | "completed"
  | "review"
  | "skipped";

export interface Flashcard {
  id: string;
  rule: string;
  explanation: string;
  codeExample: string;
  status: FlashcardStatus;
}

export interface ChallengeFix {
  label: string;
  code: string;
}

export interface Challenge {
  id: string;
  prompt: string;
  code: string;
  solution: string;
  fixes?: ChallengeFix[];
  notes?: string;
  filename?: string;
  status: ChallengeStatus;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  flashcards?: Flashcard[];
  challenges?: Challenge[];
  totalCards: number;
  completedCards: number;
  reviewCards: number;
}

export interface LearningProgress {
  totalChapters: number;
  completedChapters: number;
  totalFlashcards: number;
  completedFlashcards: number;
  reviewFlashcards: number;
  overallProgress: number;
}
