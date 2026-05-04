"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllSpecialties } from "@/services/doctor.services";
import { TSpecialty } from "@/types/specialty.types";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";

const SpecialtiesSection = () => {
  const { data: specialties, isLoading } = useQuery({
    queryKey: ["specialties"],
    queryFn: async () => {
      const response = await getAllSpecialties();
      return response.data as TSpecialty[];
    },
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Explore by Specialties
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Find the right care for your needs. Browse through our wide range of medical specialties and connect with experienced specialists.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {specialties?.map((specialty) => (
              <Link
                key={specialty.id}
                href={`/consultation?specialty=${specialty.title}`}
                className="group"
              >
                <Card className="h-full border-none bg-muted/30 transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-background p-2 group-hover:bg-white/20">
                      {specialty.icon ? (
                        <Image
                          src={specialty.icon}
                          alt={specialty.title}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-bold text-primary">
                          {specialty.title.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-semibold tracking-tight">
                      {specialty.title}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
            <Link href="/consultation" className="text-primary font-medium hover:underline inline-flex items-center">
                View all specialties
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
