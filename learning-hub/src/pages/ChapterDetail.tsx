import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useLearningProgress } from "@/hooks/use-learning-progress";
import { FlashcardView } from "@/components/FlashcardView";
import { FlashcardStatus } from "@/types/rust-learning";

const ChapterDetail = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { chapters, updateFlashcardStatus, getChapterProgress } = useLearningProgress();
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  const chapter = chapters.find(c => c.id === chapterId);

  if (!chapter) {
    return <Navigate to="/" replace />;
  }

  const handleNext = () => {
    if (currentFlashcardIndex < chapter.flashcards.length - 1) {
      setCurrentFlashcardIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(prev => prev - 1);
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