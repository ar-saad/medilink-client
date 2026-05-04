"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePatientProfile } from "@/services/profile.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileText, Loader2, Trash2, Upload, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

interface MedicalReportsManagerProps {
  reports: any[];
}

const MedicalReportsManager = ({ reports }: MedicalReportsManagerProps) => {
  const queryClient = useQueryClient();
  const [newReportName, setNewReportName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const updateMutation = useMutation({
    mutationFn: (formData: FormData) => updatePatientProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      toast.success("Medical report updated");
      setNewReportName("");
      setSelectedFile(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update reports");
    },
  });

  const handleUpload = () => {
    if (!newReportName || !selectedFile) {
      toast.error("Please provide report name and select a file");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify({ 
      medicalReports: [{ reportName: newReportName, reportLink: "placeholder" }] 
    }));
    formData.append("medicalReports", selectedFile);
    updateMutation.mutate(formData);
  };

  const handleDelete = (reportId: string) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ 
      medicalReports: [{ reportId, shouldDelete: true }] 
    }));
    updateMutation.mutate(formData);
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="rounded-2xl border bg-muted/30 p-6">
        <h3 className="text-lg font-semibold mb-4">Upload New Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-1.5">
            <Label>Report Name</Label>
            <Input 
              value={newReportName} 
              onChange={(e) => setNewReportName(e.target.value)} 
              placeholder="e.g. Blood Test Oct 2023"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Select File</Label>
            <Input 
              type="file" 
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
          <Button 
            onClick={handleUpload} 
            disabled={updateMutation.isPending}
            className="w-full"
          >
            {updateMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Report
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports?.length === 0 ? (
          <div className="col-span-full py-10 text-center text-muted-foreground border-2 border-dashed rounded-2xl">
            No medical reports uploaded yet.
          </div>
        ) : (
          reports?.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate" title={report.reportName}>
                        {report.reportName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a href={report.reportLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View
                    </a>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(report.id)}
                    disabled={updateMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MedicalReportsManager;
