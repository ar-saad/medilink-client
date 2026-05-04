"use client";

import { useEffect, useState } from "react";
import { Users, Stethoscope, Award, Smile } from "lucide-react";

const stats = [
  { label: "Expert Doctors", value: 500, icon: Stethoscope, suffix: "+" },
  { label: "Happy Patients", value: 10, icon: Smile, suffix: "k+" },
  { label: "Award Wins", value: 25, icon: Award, suffix: "+" },
  { label: "Years Experience", value: 12, icon: Users, suffix: "+" },
];

const StatsSection = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-4xl font-extrabold tracking-tight">
                  {stat.value}{stat.suffix}
                </h3>
                <p className="text-sm font-medium text-primary-foreground/80 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
