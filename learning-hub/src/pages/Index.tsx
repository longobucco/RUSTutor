import { useLearningProgress } from "@/hooks/use-learning-progress";
import { ChapterCard } from "@/components/ChapterCard";
import { StatsOverview } from "@/components/StatsOverview";
import { Button } from "@/components/ui/button";
import { RotateCcw, BookOpen } from "lucide-react";

const Index = () => {
  const { chapters, calculateProgress, resetProgress, getChapterProgress } = useLearningProgress();
  const progress = calculateProgress();

  const handleReset = () => {
    if (confirm("Sei sicuro di voler resettare tutto il progresso? Questa azione non può essere annullata.")) {
      resetProgress();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <span className="text-5xl">🦀</span>
                Rust Learning Hub
              </h1>
              <p className="text-xl opacity-90">
                Impara Rust attraverso flashcard interattive e migliora le tue competenze di programmazione
              </p>
            </div>
            <Button
              onClick={handleReset}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Progresso
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <StatsOverview progress={progress} />

        {/* Chapters Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Capitoli di Studio</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                progress={getChapterProgress(chapter.id)}
              />
            ))}
          </div>
        </section>

        {/* Footer Info */}
        <footer className="mt-16 text-center text-muted-foreground">
          <p className="text-sm">
            Studia un capitolo alla volta e traccia il tuo progresso. 
            Buona fortuna nel tuo percorso di apprendimento di Rust! 🚀
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
