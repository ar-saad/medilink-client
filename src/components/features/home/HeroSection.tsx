"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Activity, ShieldCheck, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-linear-to-br from-primary/5 via-background to-primary/10 px-4 pt-20 pb-12 sm:px-6 lg:px-8">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative z-10 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
            <Activity className="mr-2 h-3 w-3" />
            Your Health, Our Priority
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Connecting You to <span className="text-primary">Exceptional</span>{" "}
            Healthcare
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground lg:mx-0">
            MediLink simplifies your medical journey. Book appointments with
            top-rated doctors, access diagnostic reports, and manage your health
            all in one secure platform.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button
              size="lg"
              className="h-12 px-8 text-base font-semibold transition-all hover:scale-105"
              asChild
            >
              <Link href="/consultation">
                Book Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base font-semibold"
              asChild
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 md:gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm ring-1 ring-border">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground md:text-sm">
                Verified Doctors
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm ring-1 ring-border">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground md:text-sm">
                24/7 Support
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm ring-1 ring-border">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground md:text-sm">
                Quick Booking
              </span>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute top-1/2 left-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />

          <div className="relative z-10 overflow-hidden rounded-3xl border border-border/70 bg-background/90 shadow-2xl backdrop-blur-sm">
            <div className="relative aspect-5/4">
              <Image
                src="/assets/images/home_collection.png"
                alt="MediLink platform highlights"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/70 via-background/15 to-transparent" />
            </div>

            <div className="space-y-4 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                Real Platform Experience
              </p>
              <p className="text-2xl font-bold leading-tight tracking-tight text-foreground">
                A single place to consult, manage care, and follow treatment.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                <span className="rounded-full border border-border/80 px-3 py-1">
                  Consultation
                </span>
                <span className="rounded-full border border-border/80 px-3 py-1">
                  Diagnostics
                </span>
                <span className="rounded-full border border-border/80 px-3 py-1">
                  Medicine
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
