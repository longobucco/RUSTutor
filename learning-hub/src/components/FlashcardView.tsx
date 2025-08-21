import { useState } from "react";
import { Flashcard, FlashcardStatus } from "@/types/rust-learning";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Code2, CheckCircle, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardViewProps {
  flashcards: Flashcard[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onStatusChange: (flashcardId: string, status: FlashcardStatus) => void;
  onBack: () => void;
}

export const FlashcardView = ({
  flashcards,
  currentIndex,
  onNext,
  onPrevious,
  onStatusChange,
  onBack
}: FlashcardViewProps) => {
  const [showCode, setShowCode] = useState(false);
  const currentCard = flashcards[currentIndex];
  
  if (!currentCard) return null;

  const handleStatusChange = (status: FlashcardStatus) => {
    onStatusChange(currentCard.id, status);
    // Auto advance to next card after marking
    setTimeout(() => {
      if (currentIndex < flashcards.length - 1) {
        onNext();
      }
    }, 300);
  };

  const getStatusColor = (status: FlashcardStatus) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'review':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Torna ai capitoli
        </Button>
        
        <Badge variant="outline" className="px-4 py-2">
          {currentIndex + 1} di {flashcards.length}
        </Badge>
      </div>

      {/* Flashcard */}
      <Card className={cn(
        "flashcard min-h-[500px]",
        currentCard.status === 'completed' && "border-success/20",
        currentCard.status === 'review' && "border-warning/20"
      )}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-primary mb-2">
                {currentCard.rule}
              </h2>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(currentCard.status)}>
                  {currentCard.status === 'completed' ? 'Completata' :
                   currentCard.status === 'review' ? 'Da rivedere' : 'Non studiata'}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Explanation */}
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed text-foreground">
              {currentCard.explanation}
            </p>
          </div>

          {/* Code Example */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => setShowCode(!showCode)}
              className="gap-2"
            >
              <Code2 className="h-4 w-4" />
              {showCode ? 'Nascondi codice' : 'Mostra esempio di codice'}
            </Button>

            {showCode && (
              <div className="code-rust animate-in slide-in-from-top-2 duration-300">
                <pre className="whitespace-pre-wrap text-sm">
                  <code>{currentCard.codeExample}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-6 border-t">
            <Button
              onClick={() => handleStatusChange('completed')}
              className="flex-1 gap-2 bg-success hover:bg-success/90"
              disabled={currentCard.status === 'completed'}
            >
              <CheckCircle className="h-4 w-4" />
              Completata
            </Button>
            
            <Button
              onClick={() => handleStatusChange('review')}
              variant="outline"
              className="flex-1 gap-2 border-warning text-warning hover:bg-warning/10"
              disabled={currentCard.status === 'review'}
            >
              <RotateCcw className="h-4 w-4" />
              Da rivedere
            </Button>

            <Button
              onClick={() => handleStatusChange('not-started')}
              variant="outline"
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          variant="outline"
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Precedente
        </Button>

        <div className="flex space-x-2">
          {flashcards.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200",
                index === currentIndex ? "bg-primary scale-125" : "bg-muted",
                flashcards[index].status === 'completed' && "bg-success",
                flashcards[index].status === 'review' && "bg-warning"
              )}
            />
          ))}
        </div>

        <Button
          onClick={onNext}
          disabled={currentIndex === flashcards.length - 1}
          variant="outline"
          className="gap-2"
        >
          Successiva
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};