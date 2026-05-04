"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate API call
    toast.success("Subscribed successfully! Welcome to MediLink.");
    setEmail("");
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white/10 p-8 md:p-16 backdrop-blur-sm border border-white/20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 text-primary-foreground">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Stay Updated with MediLink
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Get the latest health tips, medical news, and platform updates
              delivered straight to your inbox. Join over 10,000+ subscribers
              today.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row"
          >
            <div className="relative grow">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/50 pl-4 text-lg rounded-xl"
                required
              />
            </div>
            <Button
              size="lg"
              type="submit"
              className="h-14 bg-white text-primary hover:bg-white/90 font-bold px-8 rounded-xl shrink-0"
            >
              Subscribe Now
              <Send className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
