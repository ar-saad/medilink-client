"use client";

import { updateAdminAction } from "@/app/(dashboardLayout)/admin/dashboard/admins/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TAdmin, TUpdateAdminPayload } from "@/types/admin.types";
import {
  editAdminFormZodSchema,
  TEditAdminFormValues,
} from "@/zod/admin.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface EditAdminFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: TAdmin | null;
}

const getInitialValues = (admin: TAdmin | null): TEditAdminFormValues => ({
  name: admin?.name ?? "",
  contactNumber: admin?.contactNumber ?? "",
});

const EditAdminFormModal = ({
  open,
  onOpenChange,
  admin,
}: EditAdminFormModalProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      adminId,
      payload,
    }: {
      adminId: string;
      payload: TUpdateAdminPayload;
    }) => updateAdminAction(adminId, payload),
  });

  const form = useForm({
    defaultValues: getInitialValues(admin),
    onSubmit: async ({ value }) => {
      if (!admin) {
        toast.error("Admin not found");
        return;
      }

      const payload: TUpdateAdminPayload = {};

      if (value.name.trim() !== (admin.name ?? "")) {
        payload.name = value.name.trim();
      }

      const trimmedContact = value.contactNumber.trim();
      const currentContact = admin.contactNumber ?? "";

      if (trimmedContact !== currentContact && trimmedContact.length > 0) {
        payload.contactNumber = trimmedContact;
      }

      if (Object.keys(payload).length === 0) {
        toast.info("No changes to save");
        return;
      }

      const result = await mutateAsync({
        adminId: String(admin.id),
        payload,
      });

      if (!result.success) {
        toast.error(result.message || "Failed to update admin");
        return;
      }

      toast.success(result.message || "Admin updated successfully");
      onOpenChange(false);

      void queryClient.invalidateQueries({ queryKey: ["admins"] });
      void queryClient.refetchQueries({
        queryKey: ["admins"],
        type: "active",
      });
      router.refresh();
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(getInitialValues(admin));
    }
  }, [admin, form, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px]"
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Admin</DialogTitle>
          <DialogDescription>
            Update the administrator's profile information.
          </DialogDescription>
        </DialogHeader>

        <form
          method="POST"
          action="#"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 pt-2"
        >
          <div className="space-y-1.5">
            <Label>Email</Label>
            <div className="bg-muted text-muted-foreground rounded-md border px-3 py-2 text-sm">
              {admin?.email ?? "N/A"}
            </div>
          </div>

          <form.Field
            name="name"
            validators={{ onChange: editAdminFormZodSchema.shape.name }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Full Name"
                placeholder="Enter admin name"
              />
            )}
          </form.Field>

          <form.Field
            name="contactNumber"
            validators={{
              onChange: editAdminFormZodSchema.shape.contactNumber,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Contact Number"
                placeholder="11-14 digits"
              />
            )}
          </form.Field>

          <div className="flex items-center justify-end gap-3 border-t pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>

            <form.Subscribe
              selector={(state) =>
                [state.canSubmit, state.isSubmitting] as const
              }
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isSubmitting || isPending}
                  pendingLabel="Updating admin..."
                  disabled={!canSubmit}
                  className="w-auto min-w-36"
                >
                  Update Admin
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAdminFormModal;
