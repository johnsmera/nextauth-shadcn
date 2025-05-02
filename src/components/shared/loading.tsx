import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  message?: string;
}

export function Loading({ className, message = "Carregando..." }: LoadingProps) {
  return (
    <div className={cn(
      "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300",
      className
    )}>
      <div className="flex flex-col items-center gap-2 animate-in fade-in-0 zoom-in-95">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
} 