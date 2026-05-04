"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/services/doctor.services";
import { TDoctor } from "@/types/doctor.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopDoctorsSection = () => {
  const { data: doctors, isLoading } = useQuery({
    queryKey: ["top-doctors"],
    queryFn: async () => {
      const response = await getDoctors("limit=4&sort=averageRating");
      return response.data as TDoctor[];
    },
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 mb-12 md:flex-row">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Meet Our Expert Doctors
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Our specialists are highly qualified and experienced professionals
              committed to providing the highest standard of healthcare.
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/consultation">
              View All Doctors
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[400px] w-full rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {doctors?.map((doctor) => (
              <Card
                key={doctor.id}
                className="group overflow-hidden border-none bg-muted/30 transition-all hover:shadow-2xl hover:-translate-y-2"
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-4/5 overflow-hidden">
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarImage
                        src={doctor.profilePhoto}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <AvatarFallback className="text-4xl bg-primary/5 text-primary rounded-none">
                        {doctor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute top-4 right-4 rounded-full bg-background/80 px-2 py-1 text-xs font-bold text-primary backdrop-blur-md shadow-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        {doctor.averageRating || "4.8"}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {doctor.designation || "Senior Specialist"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{doctor.experience || 5}+ Years Experience</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{doctor.address || "City Medical Center"}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    variant="secondary"
                    asChild
                  >
                    <Link href={`/consultation/${doctor.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <Button variant="outline" asChild className="mt-12 w-full md:hidden">
          <Link href="/consultation">
            View All Doctors
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default TopDoctorsSection;
