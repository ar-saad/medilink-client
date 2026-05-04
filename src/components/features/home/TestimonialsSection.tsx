"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Patient",
    content: "MediLink made it so easy to find a specialist for my knee surgery. The booking was seamless, and the doctor was top-notch.",
    avatar: "https://i.pravatar.cc/150?u=alex",
    rating: 5,
  },
  {
    name: "Sarah Miller",
    role: "Patient",
    content: "I love how I can access all my diagnostic reports in one place. It saves so much time during follow-up visits.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Patient",
    content: "The support team was incredibly helpful when I had trouble with my appointment. Highly recommended platform!",
    avatar: "https://i.pravatar.cc/150?u=michael",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            What Our Patients Say
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Don't just take our word for it. Hear from thousands of satisfied patients who have transformed their healthcare experience with MediLink.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="relative border-none bg-background p-8 shadow-sm transition-all hover:shadow-xl">
              <Quote className="absolute top-6 right-8 h-12 w-12 text-primary/10" />
              <CardContent className="p-0 space-y-6">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-4 w-4 ${j < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-lg italic text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
