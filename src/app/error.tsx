"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home, ShieldAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-destructive/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl animate-ping opacity-20" />
          <div className="relative bg-destructive/10 rounded-full p-8 mb-4 border border-destructive/20">
            <ShieldAlert className="w-20 h-20 text-destructive" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight">System Emergency!</h1>
          <p className="text-muted-foreground text-lg">
            We've encountered an unexpected complication. Our team of digital surgeons is on the way.
          </p>
          {error.digest && (
            <div className="mt-4 p-3 bg-muted rounded-lg border border-border inline-block">
              <code className="text-xs text-muted-foreground font-mono">Error ID: {error.digest}</code>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            onClick={() => reset()}
            size="lg" 
            className="w-full sm:w-auto font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-bold border-primary/20 hover:bg-primary/5">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
        </div>

        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            If the problem persists, please try refreshing the page or clearing your cache.
          </p>
        </div>
      </div>
    </div>
  );
}
