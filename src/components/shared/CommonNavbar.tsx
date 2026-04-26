"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryNavLinks = [
  { href: "/consultation", label: "Consultation" },
  { href: "/diagnostics", label: "Diagnostics" },
  { href: "/medicine", label: "Medicine" },
  { href: "/health-plans", label: "Health Plans" },
  { href: "/ngos", label: "NGOs" },
];

const authRoutes = new Set([
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
]);

const CommonNavbar = () => {
  const pathname = usePathname();

  if (pathname && authRoutes.has(pathname)) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-wide">
          MediLink
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {primaryNavLinks.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "bg-muted text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-md border px-3 py-1.5 text-foreground transition-colors hover:bg-muted"
          >
            Register
          </Link>
        </div>
      </div>

      <nav
        className="mx-auto flex w-full max-w-7xl gap-5 overflow-x-auto px-4 py-2 text-sm text-muted-foreground md:hidden sm:px-6 lg:px-8"
        aria-label="Mobile navigation"
      >
        {primaryNavLinks.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("whitespace-nowrap", isActive && "text-foreground")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default CommonNavbar;
