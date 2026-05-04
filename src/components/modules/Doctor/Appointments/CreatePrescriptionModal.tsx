import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPrescription } from "@/services/prescription.services";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CreatePrescriptionModalProps {
  appointmentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreatePrescriptionModal = ({
  appointmentId,
  open,
  onOpenChange,
}: CreatePrescriptionModalProps) => {
  const queryClient = useQueryClient();

  const prescriptionMutation = useMutation({
    mutationFn: (payload: any) => createPrescription(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
      toast.success("Prescription created successfully");
      onOpenChange(false);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create prescription");
    },
  });

  const form = useForm({
    defaultValues: {
      instructions: "",
      followUpDate: "",
    },
    onSubmit: async ({ value }) => {
      if (!appointmentId) return;
      prescriptionMutation.mutate({
        appointmentId,
        instructions: value.instructions,
        followUpDate: value.followUpDate,
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Create Prescription</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="instructions">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name}>Instructions</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Take Paracetamol 500mg after meal..."
                  rows={5}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="followUpDate">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name}>Follow-up Date (Optional)</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="date"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={prescriptionMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={prescriptionMutation.isPending}>
              {prescriptionMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Prescription"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePrescriptionModal;
