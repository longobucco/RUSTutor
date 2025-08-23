import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  RotateCcw,
  SkipForward,
} from "lucide-react";
import { Challenge, ChallengeStatus } from "@/types/rust-learning";

interface ChallengeViewProps {
  challenges: Challenge[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onStatusChange: (challengeId: string, status: ChallengeStatus) => void;
  onBack: () => void;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({
  challenges,
  currentIndex,
  onNext,
  onPrevious,
  onStatusChange,
  onBack,
}) => {
  const [showSolution, setShowSolution] = useState(false);
  const currentChallenge = challenges[currentIndex];

  const handleStatusChange = (status: ChallengeStatus) => {
    onStatusChange(currentChallenge.id, status);
    setShowSolution(false);

    // Auto-advance to next challenge if not the last one
    if (currentIndex < challenges.length - 1) {
      setTimeout(() => {
        onNext();
      }, 500);
    }
  };

  const getStatusColor = (status: ChallengeStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "review":
        return "bg-yellow-500";
      case "skipped":
        return "bg-gray-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusLabel = (status: ChallengeStatus) => {
    switch (status) {
      case "completed":
        return "Completata";
      case "review":
        return "Da rivedere";
      case "skipped":
        return "Saltata";
      default:
        return "Non iniziata";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Torna ai capitoli
        </Button>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Sfida {currentIndex + 1} di {challenges.length}
          </h1>
          <Badge className={getStatusColor(currentChallenge.status)}>
            {getStatusLabel(currentChallenge.status)}
          </Badge>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mt-4">
          {challenges.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-primary"
                  : index < currentIndex
                  ? getStatusColor(challenges[index].status)
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Challenge Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {currentChallenge.prompt}
            {currentChallenge.filename && (
              <Badge variant="outline" className="text-sm">
                {currentChallenge.filename}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Code */}
          <div className="bg-slate-900 text-slate-100 p-4 rounded-md">
            <pre className="text-sm overflow-x-auto">
              <code>{currentChallenge.code}</code>
            </pre>
          </div>

          {/* Show Solution Button */}
          {!showSolution && (
            <Button
              variant="outline"
              onClick={() => setShowSolution(true)}
              className="w-full"
            >
              <Eye className="w-4 h-4 mr-2" />
              Mostra Soluzione
            </Button>
          )}

          {/* Solution */}
          {showSolution && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <h3 className="font-semibold mb-2 text-blue-900">Soluzione:</h3>
                <p className="text-sm leading-relaxed text-blue-800">
                  {currentChallenge.solution}
                </p>
              </div>

              {currentChallenge.notes && (
                <div>
                  <h3 className="font-semibold mb-2 text-blue-900">Note:</h3>
                  <p className="text-sm text-blue-700">
                    {currentChallenge.notes}
                  </p>
                </div>
              )}

              {currentChallenge.fixes && currentChallenge.fixes.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-blue-900">
                    Possibili correzioni:
                  </h3>
                  <div className="space-y-3">
                    {currentChallenge.fixes.map((fix, fixIndex) => (
                      <div
                        key={fixIndex}
                        className="border-l-2 border-blue-400 pl-4"
                      >
                        <h4 className="font-medium text-sm mb-2 text-blue-800">
                          {fix.label}
                        </h4>
                        <div className="bg-slate-900 text-slate-100 p-3 rounded text-xs">
                          <pre className="overflow-x-auto">
                            <code>{fix.code}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action buttons */}
      {showSolution && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Button
            onClick={() => handleStatusChange("completed")}
            variant="default"
            className="bg-green-600 hover:bg-green-700"
          >
            <Check className="w-4 h-4 mr-2" />
            Completata
          </Button>
          <Button
            onClick={() => handleStatusChange("review")}
            variant="outline"
            className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Da rivedere
          </Button>
          <Button
            onClick={() => handleStatusChange("skipped")}
            variant="outline"
            className="border-gray-500 text-gray-600 hover:bg-gray-50"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Salta
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Precedente
        </Button>

        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {challenges.length}
        </span>

        <Button
          variant="outline"
          onClick={onNext}
          disabled={currentIndex === challenges.length - 1}
        >
          Successiva
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
