import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface PageLoadingProps {
  className?: string;
  message?: string;
}

export function PageLoading({ className, message = "Loading content..." }: PageLoadingProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[400px] w-full space-y-4 p-8 animate-in fade-in duration-500", className)}>
      <Spinner size={40} />
      {message && (
        <p className="text-muted-foreground animate-pulse font-medium">
          {message}
        </p>
      )}
    </div>
  );
}
