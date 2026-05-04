import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Shield, Zap, HeartPulse, ClipboardCheck, Headphones } from "lucide-react";

const features = [
  {
    title: "Verified Specialists",
    description: "Connect with board-certified doctors across various medical fields, all thoroughly vetted for your safety.",
    icon: UserCheck,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Secure Health Records",
    description: "Your medical history and diagnostic reports are encrypted and stored securely, accessible only by you.",
    icon: Shield,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Instant Booking",
    description: "Skip the waiting room. Schedule appointments in seconds and get instant confirmation for your visit.",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Personalized Care",
    description: "Receive health plans and recommendations tailored specifically to your medical history and needs.",
    icon: HeartPulse,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden costs. See consultation fees upfront and choose the specialist that fits your budget.",
    icon: ClipboardCheck,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "24/7 Support",
    description: "Our dedicated support team is always available to help you with any queries or booking issues.",
    icon: Headphones,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Why Choose MediLink?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We provide a comprehensive and user-friendly platform designed to make healthcare accessible, transparent, and efficient for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Card key={i} className="group border-none bg-background transition-all hover:shadow-xl hover:-translate-y-1">
              <CardHeader>
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${feature.bg} ${feature.color} transition-transform group-hover:scale-110`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
