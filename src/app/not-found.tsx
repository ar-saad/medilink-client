import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Stethoscope } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-ping opacity-20" />
          <div className="relative bg-muted rounded-full p-8 mb-4">
            <Stethoscope className="w-20 h-20 text-primary" />
            <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-2 shadow-lg border border-border">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-8xl font-black text-primary/10 select-none absolute -top-12 left-1/2 -translate-x-1/2 z-0">
            404
          </h1>
          <h2 className="text-3xl font-bold tracking-tight relative z-10">Page Not Found</h2>
          <p className="text-muted-foreground text-lg relative z-10">
            Oops! It seems the medical record you're looking for has been misplaced or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-4">
          <Button asChild size="lg" className="w-full sm:w-auto font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-bold border-primary/20 hover:bg-primary/5">
            <Link href="/consultation">
              Find a Doctor
            </Link>
          </Button>
        </div>
        
        <div className="pt-8 border-t border-border/50 text-sm text-muted-foreground italic">
          If you believe this is an error, please contact our support team.
        </div>
      </div>
    </div>
  );
}
