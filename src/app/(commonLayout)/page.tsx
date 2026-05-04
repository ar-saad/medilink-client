import HeroSection from "@/components/features/home/HeroSection";
import SpecialtiesSection from "@/components/features/home/SpecialtiesSection";
import FeaturesSection from "@/components/features/home/FeaturesSection";
import StatsSection from "@/components/features/home/StatsSection";
import TopDoctorsSection from "@/components/features/home/TopDoctorsSection";
import TestimonialsSection from "@/components/features/home/TestimonialsSection";
import FAQSection from "@/components/features/home/FAQSection";
import NewsletterSection from "@/components/features/home/NewsletterSection";
import HowItWorksSection from "@/components/features/home/HowItWorksSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CommonHomePage = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeaturesSection />
      <SpecialtiesSection />
      <StatsSection />
      <HowItWorksSection />
      <TopDoctorsSection />
      
      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-5xl rounded-3xl bg-primary p-12 text-center text-primary-foreground shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Ready to take control of your health?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-primary-foreground/80">
              Join thousands of patients who trust MediLink for their healthcare needs. Book your first appointment today and experience the difference.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold transition-all hover:scale-105" asChild>
                <Link href="/register">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold border-white/20 bg-white/10 hover:bg-white/20 text-white" asChild>
                <Link href="/consultation">
                  Find a Doctor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
};

export default CommonHomePage;
