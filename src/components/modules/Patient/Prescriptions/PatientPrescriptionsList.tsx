"use client";

import { getMyPrescriptions } from "@/services/prescription.services";
import { useQuery } from "@tanstack/react-query";
import { FileText, FileDown, Loader2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PatientPrescriptionsList = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["my-prescriptions"],
    queryFn: () => getMyPrescriptions(),
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const prescriptions = response?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Prescriptions</h2>
        <p className="text-muted-foreground">
          Access all medical instructions and prescriptions issued by your doctors.
        </p>
      </div>

      {prescriptions.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground border-2 border-dashed rounded-2xl">
          No prescriptions found.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {format(new Date(prescription.createdAt), "PPP")}
                  </span>
                </div>
                <CardTitle className="text-lg">{prescription.doctor?.name}</CardTitle>
                <CardDescription>{prescription.doctor?.designation}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  <div className="text-sm line-clamp-3 italic text-muted-foreground">
                    "{prescription.instructions}"
                  </div>
                  
                  {prescription.followUpDate && (
                    <div className="flex items-center gap-2 text-xs text-primary font-medium bg-primary/5 p-2 rounded-md">
                      <Calendar className="h-3 w-3" />
                      Follow-up: {format(new Date(prescription.followUpDate), "MMM dd, yyyy")}
                    </div>
                  )}
                </div>
              </CardContent>
              <div className="p-4 pt-0">
                <Button className="w-full" asChild variant="outline">
                  <a href={prescription.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <FileDown className="mr-2 h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPrescriptionsList;
