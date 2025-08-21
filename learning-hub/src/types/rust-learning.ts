export type FlashcardStatus = 'not-started' | 'completed' | 'review';

export interface Flashcard {
  id: string;
  rule: string;
  explanation: string;
  codeExample: string;
  status: FlashcardStatus;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  flashcards: Flashcard[];
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