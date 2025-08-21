import { Link } from "react-router-dom";
import { Chapter } from "@/types/rust-learning";
import { ProgressBar } from "./ProgressBar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChapterCardProps {
  chapter: Chapter;
  progress: number;
}

export const ChapterCard = ({ chapter, progress }: ChapterCardProps) => {
  const isCompleted = progress === 100;
  const hasReviews = chapter.reviewCards > 0;
  const isStarted = chapter.completedCards > 0 || chapter.reviewCards > 0;

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle className="h-5 w-5 text-success" />;
    if (hasReviews) return <AlertCircle className="h-5 w-5 text-warning" />;
    if (isStarted) return <Clock className="h-5 w-5 text-primary" />;
    return <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />;
  };

  const getStatusText = () => {
    if (isCompleted) return "Completato";
    if (hasReviews) return "Da rivedere";
    if (isStarted) return "In corso";
    return "Non iniziato";
  };

  const getStatusVariant = (): "default" | "secondary" | "destructive" | "outline" => {
    if (isCompleted) return "default";
    if (hasReviews) return "secondary";
    return "outline";
  };

  return (
    <Link to={`/chapter/${chapter.id}`}>
      <Card className={cn(
        "chapter-card group cursor-pointer",
        isCompleted && "border-success/20",
        hasReviews && "border-warning/20"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{chapter.icon}</span>
              <div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {chapter.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {chapter.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-4">
            <ProgressBar progress={progress} showLabel={false} />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{chapter.completedCards}/{chapter.totalCards} completate</span>
                {chapter.reviewCards > 0 && (
                  <span className="text-warning">{chapter.reviewCards} da rivedere</span>
                )}
              </div>
              
              <Badge variant={getStatusVariant()}>
                {getStatusText()}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};