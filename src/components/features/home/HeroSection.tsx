"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4 pt-20 pb-12 sm:px-6 lg:px-8">
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
            Connecting You to <span className="text-primary">Exceptional</span> Healthcare
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground lg:mx-0">
            MediLink simplifies your medical journey. Book appointments with top-rated doctors, access diagnostic reports, and manage your health all in one secure platform.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button size="lg" className="h-12 px-8 text-base font-semibold transition-all hover:scale-105" asChild>
              <Link href="/consultation">
                Book Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 md:gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm ring-1 ring-border">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground md:text-sm">Verified Doctors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm ring-1 ring-border">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground md:text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm ring-1 ring-border">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground md:text-sm">Quick Booking</span>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative rounded-3xl border bg-card p-2 shadow-2xl transition-transform hover:scale-[1.02] duration-500">
             {/* Note: In a real app, we'd use a high-quality medical image here */}
            <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631217816660-ad353559864e?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-80" />
                <div className="relative z-10 rounded-xl bg-background/80 p-6 backdrop-blur-md shadow-lg border border-white/20">
                    <p className="text-sm font-bold text-primary">Doctor Available</p>
                    <p className="text-xs text-muted-foreground">Dr. Sarah Johnson is online</p>
                </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-background p-4 shadow-xl border ring-1 ring-border animate-bounce-slow">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <p className="text-sm font-medium">500+ Doctors Active</p>
            </div>
          </div>
          
          <div className="absolute -top-6 -right-6 rounded-2xl bg-background p-4 shadow-xl border ring-1 ring-border animate-pulse-slow">
             <p className="text-sm font-medium text-primary">98% Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
