"use client";

import { createAdminAction } from "@/app/(dashboardLayout)/admin/dashboard/admins/_action";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createAdminFormZodSchema,
  TCreateAdminFormValues,
} from "@/zod/admin.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const defaultValues: TCreateAdminFormValues = {
  name: "",
  email: "",
  password: "",
  contactNumber: "",
};

const CreateAdminFormModal = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createAdminAction,
  });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const payload = {
        password: value.password,
        admin: {
          name: value.name,
          email: value.email,
          ...(value.contactNumber.trim().length > 0
            ? { contactNumber: value.contactNumber.trim() }
            : {}),
        },
      };

      const result = await mutateAsync(payload);

      if (!result.success) {
        toast.error(result.message || "Failed to create admin");
        return;
      }

      toast.success(result.message || "Admin created successfully");
      setOpen(false);
      form.reset();

      void queryClient.invalidateQueries({ queryKey: ["admins"] });
      void queryClient.refetchQueries({
        queryKey: ["admins"],
        type: "active",
      });
      router.refresh();
    },
  });

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);

      if (!nextOpen) {
        form.reset();
      }
    },
    [form],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" className="ml-auto shrink-0">
          <Plus className="size-4" />
          Create Admin
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[500px]"
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create Admin</DialogTitle>
          <DialogDescription>
            Add a new administrator account with credentials.
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
          <form.Field
            name="name"
            validators={{ onChange: createAdminFormZodSchema.shape.name }}
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
            name="email"
            validators={{ onChange: createAdminFormZodSchema.shape.email }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Email"
                type="email"
                placeholder="admin@example.com"
              />
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{ onChange: createAdminFormZodSchema.shape.password }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Password"
                type="password"
                placeholder="Enter temporary password"
              />
            )}
          </form.Field>

          <form.Field
            name="contactNumber"
            validators={{
              onChange: createAdminFormZodSchema.shape.contactNumber,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Contact Number (Optional)"
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
                  pendingLabel="Creating admin..."
                  disabled={!canSubmit}
                  className="w-auto min-w-36"
                >
                  Create Admin
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdminFormModal;
