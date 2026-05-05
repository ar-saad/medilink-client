import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSpecialty } from "@/services/specialty.services";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { specialtyValidationSchema } from "@/zod/specialty.validation";

interface CreateSpecialtyFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateSpecialtyFormModal = ({
  open,
  onOpenChange,
}: CreateSpecialtyFormModalProps) => {
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: (formData: FormData) => createSpecialty(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
      toast.success("Specialty created successfully");
      form.reset();
      setPreview(null);
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create specialty");
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      file: null as File | null,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify({ title: value.title }));
      if (value.file) {
        formData.append("file", value.file);
      }
      createMutation.mutate(formData);
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Specialty</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field
            name="title"
            validators={{
              onChange: specialtyValidationSchema.shape.title,
            }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Cardiology"
                />
                {field.state.meta.errors ? (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors.join(", ")}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="file">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name}>Icon</Label>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/5 transition-colors hover:bg-muted/10">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <ImagePlus className="h-8 w-8" />
                        <span className="text-xs">Upload Icon</span>
                      </div>
                    )}
                    <input
                      id={field.name}
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                      onChange={(e) => handleFileChange(e, field.handleChange)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recommended: Square SVG or PNG
                  </p>
                </div>
              </div>
            )}
          </form.Field>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setPreview(null);
                onOpenChange(false);
              }}
              disabled={createMutation.isPending}
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || createMutation.isPending}
                >
                  {createMutation.isPending || isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Specialty"
                  )}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSpecialtyFormModal;
