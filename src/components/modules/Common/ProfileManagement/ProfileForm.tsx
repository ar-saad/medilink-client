"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateAdminProfile, updateDoctorProfile, updatePatientProfile } from "@/services/profile.services";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, User, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileFormProps {
  user: any;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const role = user.role;
  const profile = role === "PATIENT" ? user.patient : role === "DOCTOR" ? user.doctor : user.admin;
  const [preview, setPreview] = useState<string | null>(profile?.profilePhoto || user.image || null);

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data.payload));
      if (data.file) {
        formData.append("profilePhoto", data.file);
      }

      if (role === "PATIENT") {
        return updatePatientProfile(formData);
      } else if (role === "DOCTOR") {
        return updateDoctorProfile(profile.id, formData);
      } else {
        return updateAdminProfile(profile.id, formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.refresh();
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const form = useForm({
    defaultValues: {
      name: profile?.name || user.name || "",
      contactNumber: profile?.contactNumber || "",
      address: profile?.address || "",
      // Doctor specific
      designation: profile?.designation || "",
      qualification: profile?.qualification || "",
      currentWorkingPlace: profile?.currentWorkingPlace || "",
      appointmentFee: profile?.appointmentFee || 0,
      file: null as File | null,
    },
    onSubmit: async ({ value }) => {
      const payload: any = {
        name: value.name,
        contactNumber: value.contactNumber,
        address: value.address,
      };

      if (role === "DOCTOR") {
        payload.designation = value.designation;
        payload.qualification = value.qualification;
        payload.currentWorkingPlace = value.currentWorkingPlace;
        payload.appointmentFee = Number(value.appointmentFee);
      }

      updateMutation.mutate({ payload, file: value.file });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setFieldValue("file", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                <AvatarImage src={preview || ""} className="object-cover" />
                <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <Camera className="h-8 w-8" />
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xl">{user.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">{role.toLowerCase().replace("_", " ")}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <form.Field name="name">
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor={field.name}>Full Name</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <div className="space-y-1.5">
              <Label>Email (Read-only)</Label>
              <Input value={user.email} disabled />
            </div>

            <form.Field name="contactNumber">
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor={field.name}>Contact Number</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="+880 1XXX XXXXXX"
                  />
                </div>
              )}
            </form.Field>

            {role === "DOCTOR" && (
              <>
                <form.Field name="designation">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label htmlFor={field.name}>Designation</Label>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                </form.Field>
                <form.Field name="currentWorkingPlace">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label htmlFor={field.name}>Current Working Place</Label>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                </form.Field>
                <form.Field name="appointmentFee">
                  {(field) => (
                    <div className="space-y-1.5">
                      <Label htmlFor={field.name}>Appointment Fee (৳)</Label>
                      <Input
                        id={field.name}
                        type="number"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(Number(e.target.value))}
                      />
                    </div>
                  )}
                </form.Field>
              </>
            )}

            <form.Field name="address">
              {(field) => (
                <div className="col-span-1 md:col-span-2 space-y-1.5">
                  <Label htmlFor={field.name}>Address</Label>
                  <Textarea
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </form.Field>

            {role === "DOCTOR" && (
              <form.Field name="qualification">
                {(field) => (
                  <div className="col-span-1 md:col-span-2 space-y-1.5">
                    <Label htmlFor={field.name}>Qualifications</Label>
                    <Textarea
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={3}
                    />
                  </div>
                )}
              </form.Field>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button type="submit" size="lg" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
