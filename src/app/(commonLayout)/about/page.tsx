import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const AboutPage = () => {
  const stats = [
    { label: "Verified Doctors", value: "500+" },
    { label: "Happy Patients", value: "50,000+" },
    { label: "Specialties", value: "40+" },
    { label: "Years Experience", value: "15+" },
  ];

  const values = [
    {
      title: "Patient First",
      description: "Everything we do is designed to provide the best possible care and experience for our patients.",
      icon: Heart,
    },
    {
      title: "Secure & Private",
      description: "Your health records and personal data are protected by the highest security standards.",
      icon: Shield,
    },
    {
      title: "Expert Care",
      description: "We partner with top-rated medical professionals who are experts in their fields.",
      icon: Award,
    },
    {
      title: "Community Driven",
      description: "We believe in making quality healthcare accessible to everyone in the community.",
      icon: Users,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-b from-primary/5 to-background overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 size-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20">Our Mission</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Revolutionizing Healthcare for <span className="text-primary">Everyone</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MediLink is dedicated to connecting patients with the best medical care through advanced technology and a human-centered approach. We're building a future where quality healthcare is just a click away.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/consultation">Find a Doctor</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Our Core Values</h2>
            <p className="text-muted-foreground">The principles that guide us in our journey to improve global healthcare.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Card key={i} className="border-none shadow-sm bg-muted/30 hover:bg-card transition-colors duration-300">
                  <CardContent className="p-8 space-y-4">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold">Driven by Innovation, Guided by Compassion</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team consists of medical experts, engineers, and visionaries working together to solve the most pressing challenges in healthcare accessibility.
              </p>
              <p className="text-muted-foreground">
                Founded with a vision to democratize healthcare, MediLink has grown into a trusted ecosystem connecting thousands of lives to life-saving medical expertise every day.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                 <div className="space-y-1">
                    <p className="text-xl font-bold text-primary">Chief Medical Officer</p>
                    <p className="text-sm text-muted-foreground">Dr. Michael Chen, MD</p>
                 </div>
                 <div className="w-px h-10 bg-border hidden sm:block" />
                 <div className="space-y-1">
                    <p className="text-xl font-bold text-primary">Head of Technology</p>
                    <p className="text-sm text-muted-foreground">Sarah Williams</p>
                 </div>
              </div>
              <Button asChild className="mt-4">
                <Link href="/register">Join Our Community</Link>
              </Button>
            </div>
            <div className="flex-1 relative">
               <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl group">
                  <Image 
                    src="/medical_team_about.png" 
                    alt="MediLink Medical Team" 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                     <p className="text-lg font-bold">The MediLink Team</p>
                     <p className="text-sm opacity-90">Committed to your health</p>
                  </div>
               </div>
               <div className="absolute -bottom-6 -left-6 size-32 bg-primary/20 rounded-full blur-2xl -z-10" />
               <div className="absolute -top-6 -right-6 size-32 bg-cyan-400/20 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
