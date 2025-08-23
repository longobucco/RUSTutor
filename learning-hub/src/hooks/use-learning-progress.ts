import { useState, useEffect } from "react";
import {
  Chapter,
  LearningProgress,
  FlashcardStatus,
  ChallengeStatus,
} from "@/types/rust-learning";
import { rustChapters, RUST_CHAPTERS_VERSION } from "@/data/rust-chapters";

export const useLearningProgress = () => {
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    // Load from localStorage if available and version matches
    try {
      const savedVersion = localStorage.getItem("rust-learning-version");
      const saved = localStorage.getItem("rust-learning-progress");
      if (
        saved &&
        savedVersion &&
        Number(savedVersion) === RUST_CHAPTERS_VERSION
      ) {
        return JSON.parse(saved) as Chapter[];
      }
    } catch (e) {
      // ignore parse errors and fall back to default
    }
    return rustChapters;
  });

  // Save to localStorage whenever chapters change
  useEffect(() => {
    try {
      localStorage.setItem("rust-learning-progress", JSON.stringify(chapters));
      localStorage.setItem(
        "rust-learning-version",
        String(RUST_CHAPTERS_VERSION)
      );
    } catch (e) {
      // ignore storage errors (e.g., quota exceeded)
    }
  }, [chapters]);

  const updateFlashcardStatus = (
    chapterId: string,
    flashcardId: string,
    status: FlashcardStatus
  ) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) => {
        if (chapter.id === chapterId) {
          const updatedFlashcards = chapter.flashcards.map((flashcard) =>
            flashcard.id === flashcardId ? { ...flashcard, status } : flashcard
          );

          // Recalculate progress for this chapter
          const completedCards = updatedFlashcards.filter(
            (f) => f.status === "completed"
          ).length;
          const reviewCards = updatedFlashcards.filter(
            (f) => f.status === "review"
          ).length;

          return {
            ...chapter,
            flashcards: updatedFlashcards,
            completedCards,
            reviewCards,
          };
        }
        return chapter;
      })
    );
  };

  const updateChallengeStatus = (
    chapterId: string,
    challengeId: string,
    status: ChallengeStatus
  ) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) => {
        if (chapter.id === chapterId && chapter.challenges) {
          const updatedChallenges = chapter.challenges.map((challenge) =>
            challenge.id === challengeId ? { ...challenge, status } : challenge
          );

          // Recalculate progress for this chapter
          const completedCards = updatedChallenges.filter(
            (c) => c.status === "completed"
          ).length;
          const reviewCards = updatedChallenges.filter(
            (c) => c.status === "review"
          ).length;

          return {
            ...chapter,
            challenges: updatedChallenges,
            completedCards,
            reviewCards,
          };
        }
        return chapter;
      })
    );
  };

  const calculateProgress = (): LearningProgress => {
    const totalChapters = chapters.length;
    const completedChapters = chapters.filter(
      (c) => c.completedCards === c.totalCards
    ).length;
    const totalFlashcards = chapters.reduce((sum, c) => sum + c.totalCards, 0);
    const completedFlashcards = chapters.reduce(
      (sum, c) => sum + c.completedCards,
      0
    );
    const reviewFlashcards = chapters.reduce(
      (sum, c) => sum + c.reviewCards,
      0
    );
    const overallProgress =
      totalFlashcards > 0
        ? Math.round((completedFlashcards / totalFlashcards) * 100)
        : 0;

    return {
      totalChapters,
      completedChapters,
      totalFlashcards,
      completedFlashcards,
      reviewFlashcards,
      overallProgress,
    };
  };

  const getChapterProgress = (chapterId: string): number => {
    const chapter = chapters.find((c) => c.id === chapterId);
    if (!chapter || chapter.totalCards === 0) return 0;
    return Math.round((chapter.completedCards / chapter.totalCards) * 100);
  };

  const resetProgress = () => {
    const resetChapters = rustChapters.map((chapter) => ({
      ...chapter,
      flashcards: chapter.flashcards?.map((flashcard) => ({
        ...flashcard,
        status: "not-started" as FlashcardStatus,
      })),
      challenges: chapter.challenges?.map((challenge) => ({
        ...challenge,
        status: "not-started" as ChallengeStatus,
      })),
      completedCards: 0,
      reviewCards: 0,
    }));
    setChapters(resetChapters);
  };

  return {
    chapters,
    updateFlashcardStatus,
    updateChallengeStatus,
    calculateProgress,
    getChapterProgress,
    resetProgress,
  };
};
