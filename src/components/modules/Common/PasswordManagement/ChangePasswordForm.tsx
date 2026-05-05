"use client";

import { changePasswordAction } from "@/app/(dashboardLayout)/(commonProtectedLayout)/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { changePasswordSchema, TChangePasswordPayload } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ChangePasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: TChangePasswordPayload) => changePasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const result = await mutateAsync(value);

        if (!result.success) {
          setServerError(result.message || "Failed to change password.");
          return;
        }

        toast.success("Password updated successfully.");
        form.reset();
      } catch (error: any) {
        console.error("Change password error:", error);
        setServerError(error.message || "An unexpected error occurred.");
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
        <div className="p-2 bg-primary/10 rounded-lg">
          <ShieldCheck className="size-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Security Policy</h3>
          <p className="text-sm text-muted-foreground">
            Choose a strong password with at least 6 characters.
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Field
          name="currentPassword"
          validators={{ onChange: changePasswordSchema.shape.currentPassword }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="••••••••"
              prepend={<Lock className="size-4 text-muted-foreground" />}
              append={
                <Button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-transparent"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="size-4 text-muted-foreground" />
                  ) : (
                    <Eye className="size-4 text-muted-foreground" />
                  )}
                </Button>
              }
            />
          )}
        </form.Field>

        <form.Field
          name="newPassword"
          validators={{ onChange: changePasswordSchema.shape.newPassword }}
        >
          {(field) => (
            <AppField
              field={field}
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••"
              prepend={<Lock className="size-4 text-muted-foreground" />}
              append={
                <Button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-transparent"
                >
                  {showNewPassword ? (
                    <EyeOff className="size-4 text-muted-foreground" />
                  ) : (
                    <Eye className="size-4 text-muted-foreground" />
                  )}
                </Button>
              }
            />
          )}
        </form.Field>

        {serverError && (
          <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <AppSubmitButton
              isPending={isSubmitting || isPending}
              disabled={!canSubmit}
              pendingLabel="Updating Password..."
              className="w-full h-11 text-base font-semibold"
            >
              Update Password
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
