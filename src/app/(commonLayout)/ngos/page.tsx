import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Globe, 
  Users, 
  Award, 
  HandHelping, 
  ArrowRight,
  Target,
  Zap,
  Quote
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const impactMetrics = [
  { label: "Lives Impacted", value: "1M+", icon: <Users className="h-6 w-6" /> },
  { label: "Rural Clinics", value: "500+", icon: <Globe className="h-6 w-6" /> },
  { label: "NGO Partners", value: "150+", icon: <HandHelping className="h-6 w-6" /> },
  { label: "Free Consultations", value: "250K", icon: <Heart className="h-6 w-6" /> }
];

const partnerNGOs = [
  {
    name: "Health For All",
    focus: "Rural Healthcare",
    description: "Providing essential medical services to remote villages across the continent.",
    logo: "HFA"
  },
  {
    name: "ChildCare Foundation",
    focus: "Pediatrics",
    description: "Ensuring every child has access to quality vaccinations and nutrition.",
    logo: "CCF"
  },
  {
    name: "Vision Trust",
    focus: "Ophthalmology",
    description: "Eliminating preventable blindness through free eye surgeries and camps.",
    logo: "VT"
  },
  {
    name: "HeartSync",
    focus: "Cardiac Care",
    description: "Supporting low-income families with affordable cardiac treatments and surgeries.",
    logo: "HS"
  }
];

const NGOsPage = () => {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-rose-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/ngos_hero.png" 
            alt="NGOs Hero" 
            fill 
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-rose-950 via-rose-950/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-8">
            <Badge variant="outline" className="text-rose-400 border-rose-400 bg-rose-400/10 px-4 py-1">
              Social Responsibility
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Healing Communities, <br />
              <span className="text-rose-400">One Life at a Time.</span>
            </h1>
            <p className="text-xl text-rose-100/80 max-w-2xl">
              MediLink partners with non-profit organizations to bridge the healthcare gap. Together, we bring world-class medical expertise to those who need it most.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="h-14 px-10 bg-rose-500 hover:bg-rose-600 border-none font-bold text-lg">
                Partner With Us
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 bg-white/5 hover:bg-white/10 text-white border-white/20 font-bold text-lg">
                View Impact Report
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-rose-50 rounded-3xl p-10 md:p-16 -mt-20 relative z-20 border border-rose-100 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impactMetrics.map((metric, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="h-12 w-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200">
                    {metric.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-rose-950">{metric.value}</div>
                  <div className="text-sm font-bold text-rose-600 uppercase tracking-wider">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Our Mission for a <br />
                <span className="text-rose-500 underline decoration-rose-200 underline-offset-8">Healthier Tomorrow</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At MediLink, we believe that quality healthcare is a fundamental human right, not a privilege. Our NGO collaboration program is designed to leverage our technology to reach underserved populations.
              </p>
            </div>
            
            <div className="grid gap-6">
              {[
                { title: "Accessibility", desc: "Telemedicine for remote and rural areas.", icon: <Globe className="h-6 w-6 text-rose-500" /> },
                { title: "Affordability", desc: "Subsidized costs for low-income patients.", icon: <Zap className="h-6 w-6 text-rose-500" /> },
                { title: "Quality", desc: "Access to the same verified doctors as our premium users.", icon: <Award className="h-6 w-6 text-rose-500" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all">
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <Image 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000" 
                alt="Volunteers" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* Partner NGOs */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">Our Global Partners</h2>
              <p className="text-slate-400 max-w-xl">We are proud to support these organizations in their tireless efforts to improve global health standards.</p>
            </div>
            <Button variant="outline" className="border-rose-500/50 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 font-bold">
              Become a Partner
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerNGOs.map((ngo, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 text-white hover:border-rose-500/50 transition-all group cursor-pointer">
                <CardHeader>
                  <div className="h-16 w-16 bg-slate-700 rounded-2xl flex items-center justify-center text-2xl font-black text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                    {ngo.logo}
                  </div>
                  <CardTitle className="text-xl">{ngo.name}</CardTitle>
                  <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30 w-fit mt-2">{ngo.focus}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {ngo.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="bg-rose-50 rounded-[4rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden">
          <Quote className="h-20 w-20 text-rose-200 absolute top-10 left-10 -rotate-12" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <p className="text-2xl md:text-4xl font-medium text-rose-950 italic leading-relaxed">
              "MediLink's platform has transformed how we deliver healthcare in rural districts. Their technology allows us to connect local clinics with world-class specialists instantly."
            </p>
            <div className="space-y-2">
              <div className="font-black text-xl text-rose-900">Dr. Helena Smith</div>
              <div className="text-rose-600 font-bold uppercase tracking-widest text-sm">Director, Health For All</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">Want to make an impact?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you are an NGO looking for technology partnership or an individual looking to donate, your support matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 bg-rose-600 hover:bg-rose-700 text-lg font-bold">
              Donate to a Cause
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold border-rose-200 hover:bg-rose-50 text-rose-600">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NGOsPage;
