import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getPrescriptionByAppointmentId } from "@/services/prescription.services";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewPrescriptionModalProps {
  appointmentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewPrescriptionModal = ({
  appointmentId,
  open,
  onOpenChange,
}: ViewPrescriptionModalProps) => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["prescription", appointmentId],
    queryFn: () => getPrescriptionByAppointmentId(appointmentId!),
    enabled: !!appointmentId && open,
  });

  const prescription = response?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Prescription Details</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : prescription ? (
          <div className="space-y-6 py-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Doctor</p>
              <p className="text-lg font-semibold">{prescription.doctor?.name}</p>
              <p className="text-sm text-muted-foreground">{prescription.doctor?.designation}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Instructions</p>
              <div className="rounded-lg border bg-muted/30 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                {prescription.instructions}
              </div>
            </div>

            {prescription.followUpDate && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Follow-up Date</p>
                <p className="text-sm font-medium">
                  {format(new Date(prescription.followUpDate), "MMMM dd, yyyy")}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Issued on {format(new Date(prescription.createdAt), "PPP")}
              </p>
              {prescription.pdfUrl && (
                <Button size="sm" asChild>
                  <a href={prescription.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <FileDown className="mr-2 h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="py-10 text-center text-muted-foreground">
            Prescription not found.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewPrescriptionModal;
