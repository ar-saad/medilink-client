import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Search,
  Upload,
  Truck,
  ShieldCheck,
  Clock,
  ArrowRight,
  Pill,
  Baby,
  Activity,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Prescription",
    icon: <Pill className="h-8 w-8 text-primary" />,
    items: "10,000+ items",
  },
  {
    name: "Baby Care",
    icon: <Baby className="h-8 w-8 text-primary" />,
    items: "500+ items",
  },
  {
    name: "Chronic Care",
    icon: <Activity className="h-8 w-8 text-primary" />,
    items: "2,000+ items",
  },
  {
    name: "Fitness",
    icon: <Heart className="h-8 w-8 text-primary" />,
    items: "1,500+ items",
  },
];

const features = [
  {
    title: "Genuine Medicines",
    description:
      "All products are sourced directly from authorized distributors.",
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
  },
  {
    title: "Fast Delivery",
    description:
      "Get your medicines delivered within 2-4 hours in major cities.",
    icon: <Truck className="h-6 w-6 text-primary" />,
  },
  {
    title: "24/7 Support",
    description:
      "Our pharmacists are available round the clock for consultation.",
    icon: <Clock className="h-6 w-6 text-primary" />,
  },
];

const MedicinePage = () => {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-teal-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/medicine_hero.png"
            alt="Medicine Hero"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-teal-950 via-teal-950/80 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <Badge
              variant="outline"
              className="text-teal-400 border-teal-400 bg-teal-400/10 px-4 py-1"
            >
              MediLink Pharmacy
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Your Pharmacy, <br />
              <span className="text-teal-400">Simplified.</span>
            </h1>
            <p className="text-lg text-teal-100/80 max-w-xl">
              Order medicines, health products, and supplements from the comfort
              of your home. Upload prescriptions and get them verified by our
              expert pharmacists.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="h-12 px-8 bg-teal-500 hover:bg-teal-600 border-none"
              >
                Browse Shop
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 bg-white/5 hover:bg-white/10 text-white border-white/20"
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Prescription
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="bg-background rounded-2xl shadow-xl p-4 -mt-16 relative z-20 border border-border/50 max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for medicines, wellness products, brands..."
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-input bg-background text-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-500 hover:bg-teal-600">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight">
            Shop by Category
          </h2>
          <p className="text-muted-foreground">
            Everything you need for your health and wellness.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-muted/50 rounded-3xl p-8 text-center space-y-4 transition-all group-hover:bg-teal-500/5 group-hover:-translate-y-1 border border-transparent group-hover:border-teal-500/20">
                <div className="h-20 w-20 bg-background rounded-2xl mx-auto flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.items}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-6">
                <div className="h-14 w-14 rounded-2xl bg-teal-500/10 flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prescription Upload Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShoppingBag className="h-64 w-64 text-white" />
            </div>

            <div className="grid md:grid-cols-2 items-center">
              <div className="p-12 md:p-20 space-y-8 text-white relative z-10">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                    Quick Prescription <br />
                    <span className="text-teal-400">Verification</span>
                  </h2>
                  <p className="text-slate-400 text-lg">
                    Don't have time to search? Just upload your prescription,
                    and our pharmacists will handle the rest.
                  </p>
                </div>

                <ul className="space-y-4">
                  {[
                    "Upload clear photo of prescription",
                    "Pharmacist reviews and adds to cart",
                    "Review and checkout with discounts",
                    "Fast delivery at your doorstep",
                  ].map((step, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs font-bold border border-teal-500/30">
                        {i + 1}
                      </div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className="h-14 px-10 bg-teal-500 hover:bg-teal-600 text-lg font-bold"
                >
                  Upload Now
                </Button>
              </div>

              <div className="relative h-full min-h-[400px] hidden md:block">
                <Image
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=1000"
                  alt="Pharmacist"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-slate-900 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Health & Wellness Deals
          </h2>
          <Button variant="outline" className="group">
            View All Offers{" "}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <Card
              key={i}
              className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all border-border/50 bg-background flex flex-col h-full"
            >
              <div className="aspect-4/3 relative bg-slate-50 overflow-hidden">
                <Image
                  src="/assets/images/medicine_product.png"
                  alt="Product"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform"
                />
                <Badge className="absolute top-4 left-4 bg-rose-500 hover:bg-rose-600 border-none px-3 py-1 font-bold">
                  20% OFF
                </Badge>
              </div>
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-lg font-bold line-clamp-2 min-h-14">
                  Premium Multivitamin Tablets - 60 Count
                </CardTitle>
                <CardDescription className="text-teal-600 font-semibold">
                  By HealthCare Labs
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 mt-auto space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">
                    $24.00
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    $29.99
                  </span>
                </div>
                <Button className="w-full bg-teal-500 hover:bg-teal-600 h-11 font-bold text-base shadow-lg shadow-teal-500/20">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MedicinePage;
