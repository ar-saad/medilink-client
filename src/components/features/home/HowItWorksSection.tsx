"use client";

import { CheckCircle2, UserPlus, Search, CalendarCheck } from "lucide-react";

const steps = [
  {
    title: "Create Account",
    description: "Sign up for a free account to manage your health journey and book appointments.",
    icon: UserPlus,
    color: "bg-blue-500",
  },
  {
    title: "Find a Doctor",
    description: "Search from our list of verified specialists based on your needs and location.",
    icon: Search,
    color: "bg-cyan-500",
  },
  {
    title: "Book Appointment",
    description: "Choose a convenient time slot and book your consultation in seconds.",
    icon: CalendarCheck,
    color: "bg-sky-500",
  },
  {
    title: "Get Consultation",
    description: "Consult with your doctor online or in-person and receive expert care.",
    icon: CheckCircle2,
    color: "bg-indigo-500",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How MediLink Works</h2>
          <p className="text-muted-foreground">Four simple steps to get the quality healthcare you deserve.</p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted hidden lg:block -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center space-y-6 group">
                  <div className={`size-16 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="size-8" />
                    <div className="absolute -top-2 -right-2 size-6 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center border-2 border-muted shadow-sm">
                        {index + 1}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
