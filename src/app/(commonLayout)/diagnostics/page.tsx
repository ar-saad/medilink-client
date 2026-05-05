import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Beaker, 
  Search, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Activity,
  ArrowRight,
  TestTube,
  Microscope,
  Stethoscope
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const popularTests = [
  {
    title: "Full Body Checkup",
    price: "$99",
    tests: "60+ parameters",
    icon: <Activity className="h-6 w-6 text-primary" />,
    popular: true
  },
  {
    title: "Diabetes Screening",
    price: "$49",
    tests: "HbA1c, Fasting Blood Sugar",
    icon: <Beaker className="h-6 w-6 text-primary" />,
    popular: false
  },
  {
    title: "Cardiac Profile",
    price: "$79",
    tests: "Lipid Profile, ECG, TMT",
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    popular: false
  },
  {
    title: "Vitamin D & B12",
    price: "$39",
    tests: "Essential vitamins check",
    icon: <TestTube className="h-6 w-6 text-primary" />,
    popular: false
  }
];

const labPartners = [
  { name: "Global Labs", location: "New York", rating: "4.9" },
  { name: "Precision Diagnostics", location: "London", rating: "4.8" },
  { name: "HealthPath", location: "Dubai", rating: "4.7" },
  { name: "BioTech Analytics", location: "Singapore", rating: "4.9" }
];

const DiagnosticsPage = () => {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/diagnostics_hero.png" 
            alt="Diagnostics Hero" 
            fill 
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <Badge variant="outline" className="text-primary border-primary bg-primary/10 px-4 py-1">
              Advanced Diagnostics
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Accurate Results. <br />
              <span className="text-primary">Faster Decisions.</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Book from over 1,000+ diagnostic tests and get results delivered to your MediLink app within 24 hours. Certified labs, professional phlebotomists.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="h-12 px-8">
                Book a Test
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 bg-white/5 hover:bg-white/10 text-white border-white/20">
                Find Nearest Lab
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="bg-background rounded-2xl shadow-xl p-6 -mt-20 relative z-20 border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search for blood tests, MRI, X-ray, etc..." 
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Select Location: </span>
                <Badge variant="secondary" className="cursor-pointer">Manhattan, NY</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tests */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Popular Diagnostic Packages</h2>
            <p className="text-muted-foreground">Comprehensive health checkups tailored for you and your family.</p>
          </div>
          <Button variant="ghost" className="text-primary group">
            View All Tests <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTests.map((test, index) => (
            <Card key={index} className={`relative transition-all hover:shadow-lg ${test.popular ? 'border-primary ring-1 ring-primary/20' : ''}`}>
              {test.popular && (
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Best Value</Badge>
              )}
              <CardHeader>
                <div className="mb-2">{test.icon}</div>
                <CardTitle className="text-xl">{test.title}</CardTitle>
                <CardDescription>{test.tests}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold">{test.price}</span>
                  <span className="text-sm text-muted-foreground line-through mb-1">$149</span>
                </div>
                <Button className="w-full" variant={test.popular ? "default" : "outline"}>
                  Select Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Lab Partners */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Our Trusted Lab Partners</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We collaborate with NABL & CAP certified laboratories to ensure the highest standards of accuracy and reliability for your health reports.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {labPartners.map((lab, index) => (
              <div key={index} className="bg-background p-8 rounded-2xl border border-border/50 text-center space-y-4 hover:border-primary/30 transition-colors cursor-pointer group">
                <div className="h-16 w-16 bg-muted rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Microscope className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg">{lab.name}</h3>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {lab.location}
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Badge variant="outline" className="text-orange-500 border-orange-200">★ {lab.rating}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Collection Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-12 space-y-8 text-primary-foreground">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Free Sample Collection from Your Doorstep
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold">Flexible Timing</p>
                      <p className="text-primary-foreground/80 text-sm">Pick a slot that works for you, including early mornings.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold">Certified Phlebotomists</p>
                      <p className="text-primary-foreground/80 text-sm">Highly trained professionals for painless sample collection.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold">Digital Reports</p>
                      <p className="text-primary-foreground/80 text-sm">Access your reports directly in the app within 24 hours.</p>
                    </div>
                  </div>
                </div>
                <Button size="lg" variant="secondary" className="font-bold">
                  Schedule Collection
                </Button>
              </div>
              <div className="relative min-h-[400px] bg-slate-200">
                <Image 
                  src="/assets/images/home_collection.png" 
                  alt="Home Collection" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiagnosticsPage;
