"use client";

import HealthRecordsForm from "@/components/modules/Patient/HealthRecords/HealthRecordsForm";
import { getMyProfile } from "@/services/profile.services";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const HealthRecordsPage = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: () => getMyProfile(),
  });

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const patient = response?.data;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Health Records</h1>
        <p className="text-muted-foreground text-lg">
          Keep your medical profile up-to-date for better consultation.
        </p>
      </div>
      
      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <HealthRecordsForm healthData={patient?.patientHealthData} />
      </div>
    </div>
  );
};

export default HealthRecordsPage;
