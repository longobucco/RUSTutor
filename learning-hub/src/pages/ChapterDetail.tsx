import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useLearningProgress } from "@/hooks/use-learning-progress";
import { FlashcardView } from "@/components/FlashcardView";
import { ChallengeView } from "@/components/ChallengeView";
import { FlashcardStatus, ChallengeStatus } from "@/types/rust-learning";

const ChapterDetail = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const {
    chapters,
    updateFlashcardStatus,
    updateChallengeStatus,
    getChapterProgress,
  } = useLearningProgress();
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  const chapter = chapters.find((c) => c.id === chapterId);

  if (!chapter) {
    return <Navigate to="/" replace />;
  }

  // Handle challenge-based chapters (like review chapters)
  if (chapter.challenges && chapter.challenges.length > 0) {
    const handleNextChallenge = () => {
      if (currentChallengeIndex < chapter.challenges!.length - 1) {
        setCurrentChallengeIndex((prev) => prev + 1);
      }
    };

    const handlePreviousChallenge = () => {
      if (currentChallengeIndex > 0) {
        setCurrentChallengeIndex((prev) => prev - 1);
      }
    };

    const handleChallengeStatusChange = (
      challengeId: string,
      status: ChallengeStatus
    ) => {
      updateChallengeStatus(chapter.id, challengeId, status);
    };

    const handleBack = () => {
      window.history.back();
    };

    return (
      <div className="min-h-screen bg-background">
        <ChallengeView
          challenges={chapter.challenges}
          currentIndex={currentChallengeIndex}
          onNext={handleNextChallenge}
          onPrevious={handlePreviousChallenge}
          onStatusChange={handleChallengeStatusChange}
          onBack={handleBack}
        />
      </div>
    );
  }

  // Handle flashcard-based chapters (existing functionality)
  if (!chapter.flashcards || chapter.flashcards.length === 0) {
    return <Navigate to="/" replace />;
  }

  const handleNext = () => {
    if (currentFlashcardIndex < chapter.flashcards!.length - 1) {
      setCurrentFlashcardIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex((prev) => prev - 1);
    }
  };

  const handleStatusChange = (flashcardId: string, status: FlashcardStatus) => {
    updateFlashcardStatus(chapter.id, flashcardId, status);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background">
      <FlashcardView
        flashcards={chapter.flashcards}
        currentIndex={currentFlashcardIndex}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onStatusChange={handleStatusChange}
        onBack={handleBack}
      />
    </div>
  );
};

export default ChapterDetail;
