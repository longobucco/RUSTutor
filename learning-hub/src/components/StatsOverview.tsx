import { LearningProgress } from "@/types/rust-learning";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "./ProgressBar";
import { BookOpen, CheckCircle, RotateCcw, TrendingUp } from "lucide-react";

interface StatsOverviewProps {
  progress: LearningProgress;
}

export const StatsOverview = ({ progress }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Overall Progress */}
      <Card className="bg-gradient-primary text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Progresso Totale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{progress.overallProgress}%</div>
          <div className="text-sm opacity-90">
            {progress.completedFlashcards} di {progress.totalFlashcards} flashcard
          </div>
        </CardContent>
      </Card>

      {/* Chapters Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Capitoli
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2 text-foreground">
            {progress.completedChapters}/{progress.totalChapters}
          </div>
          <div className="text-sm text-muted-foreground">
            Capitoli completati
          </div>
        </CardContent>
      </Card>

      {/* Completed Cards */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-success">
            <CheckCircle className="h-4 w-4" />
            Completate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2 text-success">
            {progress.completedFlashcards}
          </div>
          <div className="text-sm text-muted-foreground">
            Flashcard completate
          </div>
        </CardContent>
      </Card>

      {/* Review Cards */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-warning">
            <RotateCcw className="h-4 w-4" />
            Da Rivedere
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2 text-warning">
            {progress.reviewFlashcards}
          </div>
          <div className="text-sm text-muted-foreground">
            Flashcard da rivedere
          </div>
        </CardContent>
      </Card>
    </div>
  );
};