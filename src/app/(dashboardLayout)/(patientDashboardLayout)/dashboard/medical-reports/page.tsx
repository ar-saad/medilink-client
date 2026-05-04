"use client";

import MedicalReportsManager from "@/components/modules/Patient/MedicalReports/MedicalReportsManager";
import { getMyProfile } from "@/services/profile.services";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const MedicalReportsPage = () => {
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
        <h1 className="text-3xl font-bold tracking-tight">Medical Reports</h1>
        <p className="text-muted-foreground text-lg">
          Upload and manage your diagnostic tests and medical documents.
        </p>
      </div>
      
      <MedicalReportsManager reports={patient?.medicalReports || []} />
    </div>
  );
};

export default MedicalReportsPage;
