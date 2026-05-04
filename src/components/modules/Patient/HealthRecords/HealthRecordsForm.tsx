"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updatePatientProfile } from "@/services/profile.services";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface HealthRecordsFormProps {
  healthData: any;
}

const HealthRecordsForm = ({ healthData }: HealthRecordsFormProps) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (payload: any) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify({ patientHealthData: payload }));
      return updatePatientProfile(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      toast.success("Health records updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update health records");
    },
  });

  const form = useForm({
    defaultValues: {
      dateOfBirth: healthData?.dateOfBirth ? new Date(healthData.dateOfBirth).toISOString().split("T")[0] : "",
      gender: healthData?.gender || "MALE",
      bloodGroup: healthData?.bloodGroup || "A_POSITIVE",
      height: healthData?.height || "",
      weight: healthData?.weight || "",
      dietaryPreferences: healthData?.dietaryPreferences || "",
      mentalHealthHistory: healthData?.mentalHealthHistory || "",
      immunizationStatus: healthData?.immunizationStatus || "",
      hasAllergies: healthData?.hasAllergies || false,
      hasDiabetes: healthData?.hasDiabetes || false,
      hasPastSurgeries: healthData?.hasPastSurgeries || false,
      recentAnxiety: healthData?.recentAnxiety || false,
      recentDepression: healthData?.recentDepression || false,
      isSmoking: healthData?.isSmoking || false,
      isPregannant: healthData?.isPregannant || false,
    },
    onSubmit: async ({ value }) => {
      updateMutation.mutate(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <form.Field name="dateOfBirth">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Date of Birth</Label>
              <Input
                id={field.name}
                type="date"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="gender">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Gender</Label>
              <Select
                onValueChange={field.handleChange}
                defaultValue={field.state.value}
              >
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        <form.Field name="bloodGroup">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Blood Group</Label>
              <Select
                onValueChange={field.handleChange}
                defaultValue={field.state.value}
              >
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A_POSITIVE">A+</SelectItem>
                  <SelectItem value="A_NEGATIVE">A-</SelectItem>
                  <SelectItem value="B_POSITIVE">B+</SelectItem>
                  <SelectItem value="B_NEGATIVE">B-</SelectItem>
                  <SelectItem value="AB_POSITIVE">AB+</SelectItem>
                  <SelectItem value="AB_NEGATIVE">AB-</SelectItem>
                  <SelectItem value="O_POSITIVE">O+</SelectItem>
                  <SelectItem value="O_NEGATIVE">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        <form.Field name="height">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Height (cm)</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. 175"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="weight">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Weight (kg)</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. 70"
              />
            </div>
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form.Field name="dietaryPreferences">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Dietary Preferences</Label>
              <Textarea
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. Vegetarian, No peanuts..."
                rows={3}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="mentalHealthHistory">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Mental Health History</Label>
              <Textarea
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Any previous history or concerns..."
                rows={3}
              />
            </div>
          )}
        </form.Field>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={updateMutation.isPending}>
          {updateMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Update Health Data"
          )}
        </Button>
      </div>
    </form>
  );
};

export default HealthRecordsForm;
