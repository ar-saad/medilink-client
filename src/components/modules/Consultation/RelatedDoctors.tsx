"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/services/doctor.services";
import { TDoctor } from "@/types/doctor.types";
import DoctorCard from "./DoctorCard";
import { Skeleton } from "@/components/ui/skeleton";

interface RelatedDoctorsProps {
  specialtyTitle?: string;
  currentDoctorId: string | number;
}

const RelatedDoctors = ({ specialtyTitle, currentDoctorId }: RelatedDoctorsProps) => {
  const { data: doctorsResponse, isLoading } = useQuery({
    queryKey: ["related-doctors", specialtyTitle],
    queryFn: () => {
      const queryString = specialtyTitle 
        ? `specialties.specialty.title=${specialtyTitle}&limit=4`
        : "limit=4";
      return getDoctors(queryString);
    },
    enabled: !!specialtyTitle,
  });

  const relatedDoctors = (doctorsResponse?.data ?? []).filter(
    (doc) => String(doc.id) !== String(currentDoctorId)
  );

  if (!isLoading && relatedDoctors.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Related Specialists</h2>
      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl border bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {relatedDoctors.map((doctor: TDoctor) => (
            <DoctorCard 
              key={String(doctor.id)} 
              doctor={doctor} 
              isAuthenticated={false} // We don't need auth state for related cards necessarily
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedDoctors;
