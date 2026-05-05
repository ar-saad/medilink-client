import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Star,
  ShieldCheck,
  Users,
  Activity,
  ArrowRight,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";

const plans = [
  {
    name: "Silver",
    price: "$29",
    description: "Essential healthcare coverage for individuals.",
    features: [
      "Unlimited General Consultations",
      "2 Specialist Consultations/year",
      "10% discount on Diagnostics",
      "Free Home Sample Collection",
      "Digital Health Records",
    ],
    notIncluded: ["Family Coverage", "Free Health Checkup", "Priority Support"],
    color: "bg-slate-100",
    popular: false,
  },
  {
    name: "Gold",
    price: "$59",
    description: "Most popular plan for comprehensive care.",
    features: [
      "Unlimited General Consultations",
      "6 Specialist Consultations/year",
      "25% discount on Diagnostics",
      "Free Home Sample Collection",
      "Digital Health Records",
      "Annual Health Checkup (Basic)",
      "Priority Support",
    ],
    notIncluded: ["Family Coverage"],
    color: "bg-primary/5",
    popular: true,
  },
  {
    name: "Platinum",
    price: "$99",
    description: "Premium coverage for you and your family.",
    features: [
      "Unlimited General Consultations",
      "Unlimited Specialist Consultations",
      "50% discount on Diagnostics",
      "Free Home Sample Collection",
      "Digital Health Records",
      "Annual Health Checkup (Comprehensive)",
      "Priority Support",
      "Coverage for up to 4 family members",
      "Personal Health Manager",
    ],
    notIncluded: [],
    color: "bg-slate-900 text-white",
    popular: false,
  },
];

const faqs = [
  {
    question: "What is included in a general consultation?",
    answer:
      "General consultations include visits to General Physicians for common ailments like fever, cold, or general health advice. These are unlimited in all our plans.",
  },
  {
    question: "Can I add more family members to the Platinum plan?",
    answer:
      "Yes, you can add more than 4 family members at a discounted rate of $15 per member per month.",
  },
  {
    question: "How do I claim my free health checkup?",
    answer:
      "Once you subscribe to Gold or Platinum, you can book your checkup through the 'My Plans' section in your dashboard. We will send a phlebotomist to your home.",
  },
  {
    question: "Is there a waiting period for specialist consultations?",
    answer:
      "No, specialist consultations are available immediately after your plan starts.",
  },
];

const HealthPlansPage = () => {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-indigo-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/health_plans_hero.png"
            alt="Health Plans Hero"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-indigo-950/50 via-indigo-950 to-indigo-950" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center space-y-8">
          <Badge
            variant="outline"
            className="text-indigo-300 border-indigo-300 bg-indigo-300/10 px-4 py-1"
          >
            MediLink Care Plans
          </Badge>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto">
            Healthcare That <br />
            <span className="text-indigo-400">Protects Your Future.</span>
          </h1>
          <p className="text-xl text-indigo-100/70 max-w-2xl mx-auto">
            Choose a plan that fits your lifestyle and budget. Enjoy peace of
            mind with comprehensive medical coverage and exclusive benefits.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="h-14 px-10 bg-indigo-500 hover:bg-indigo-600 text-lg font-bold"
            >
              View Plans
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 bg-white/5 hover:bg-white/10 text-white border-white/20"
            >
              Talk to Expert
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-10">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col h-full border-2 transition-all hover:scale-[1.02] overflow-visible ${plan.popular ? "border-primary shadow-2xl md:scale-105 z-10" : "border-border/50"} ${plan.name === "Platinum" ? "bg-slate-950 text-white border-slate-800" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold shadow-lg z-20 whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}
              <CardHeader className="text-center p-8">
                <CardTitle className="text-2xl font-bold mb-2">
                  {plan.name}
                </CardTitle>
                <CardDescription
                  className={plan.name === "Platinum" ? "text-slate-400" : ""}
                >
                  {plan.description}
                </CardDescription>
                <div className="mt-6 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  <span
                    className={`text-lg font-medium ${plan.name === "Platinum" ? "text-slate-400" : "text-muted-foreground"}`}
                  >
                    /mo
                  </span>
                </div>
              </CardHeader>
              <CardContent className="grow p-8 pt-0 space-y-6">
                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 opacity-40">
                      <div className="h-5 w-5 rounded-full bg-slate-500/20 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="h-3 w-3" />
                      </div>
                      <span className="text-sm line-through">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-8 mt-auto">
                <Button
                  className={`w-full h-12 font-bold ${plan.name === "Platinum" ? "bg-indigo-500 hover:bg-indigo-600" : plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={
                    plan.popular || plan.name === "Platinum"
                      ? "default"
                      : "outline"
                  }
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Showcase */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Why Choose MediLink Plans?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We go beyond just insurance. We provide a complete health
              ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "No Paperwork",
                desc: "Digital onboarding and claims process.",
                icon: <ShieldCheck className="h-10 w-10 text-indigo-500" />,
              },
              {
                title: "Network of 5000+",
                desc: "Access to top hospitals and clinics.",
                icon: <Users className="h-10 w-10 text-indigo-500" />,
              },
              {
                title: "Instant Access",
                desc: "Consult doctors within minutes.",
                icon: <Activity className="h-10 w-10 text-indigo-500" />,
              },
              {
                title: "Free Health Checkups",
                desc: "Annual preventive screenings included.",
                icon: <Star className="h-10 w-10 text-indigo-500" />,
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="bg-background p-8 rounded-3xl border border-border/50 text-center space-y-4 hover:shadow-xl transition-all"
              >
                <div className="bg-indigo-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-xl">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-indigo-500 font-bold uppercase tracking-wider text-sm">
            <HelpCircle className="h-4 w-4" /> Got Questions?
          </div>
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border rounded-2xl px-6 bg-background"
            >
              <AccordionTrigger className="hover:no-underline font-bold py-6 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>

          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Still Unsure?</h2>
            <p className="text-xl text-indigo-100/80 max-w-2xl mx-auto">
              Our health consultants are here to help you choose the best plan
              for your family. Schedule a free call today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-10 text-lg font-bold"
              >
                Call Us: +1 (555) 123-4567
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 bg-white/10 hover:bg-white/20 border-white/20 text-white font-bold"
              >
                Request a Callback
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthPlansPage;
