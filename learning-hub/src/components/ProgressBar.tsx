import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
  variant?: 'default' | 'success' | 'warning';
}

export const ProgressBar = ({ 
  progress, 
  className, 
  showLabel = true, 
  variant = 'default' 
}: ProgressBarProps) => {
  const getProgressColor = () => {
    switch (variant) {
      case 'success':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      default:
        return 'bg-gradient-primary';
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="progress-bar">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            getProgressColor()
          )}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Progresso</span>
          <span className="font-medium">{progress}%</span>
        </div>
      )}
    </div>
  );
};