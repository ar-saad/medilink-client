"use client";

import { handleResetPassword } from "@/app/(commonLayout)/(auth)/reset-password/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { resetPasswordSchema, TResetPasswordPayload } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Lock, Mail, KeyRound, Eye, EyeOff, ArrowLeft, CheckCircle2, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/providers/UserProvider";
import { getDefaultDashboardRoute } from "@/lib/authUtils";

const ResetPasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";
  const { refetch } = useUser();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: TResetPasswordPayload) => handleResetPassword(payload),
  });

  const form = useForm({
    defaultValues: {
      email: emailFromQuery,
      otp: "",
      newPassword: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const result = await mutateAsync(value);

        if (!result.success) {
          setServerError(result.message || "Failed to reset password.");
          return;
        }

        setIsSuccess(true);
        toast.success("Password reset successfully.");
        refetch();
        setTimeout(() => {
          const dashboardRoute = result.data?.role ? getDefaultDashboardRoute(result.data.role) : "/dashboard";
          router.push(dashboardRoute);
        }, 3000);
      } catch (error: any) {
        console.error("Reset password error:", error);
        setServerError(error.message || "An unexpected error occurred.");
      }
    },
  });

  if (isSuccess) {
    return (
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <Card className="border-none shadow-2xl bg-background/80 backdrop-blur-sm text-center">
          <CardHeader className="pt-10 pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <CheckCircle2 className="size-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">Success!</CardTitle>
            <CardDescription className="text-base pt-2">
              Your password has been reset successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 text-center">
            <p className="text-sm text-muted-foreground mb-6">
              You will be redirected to the dashboard in a few seconds...
            </p>
            <Link href="/">
              <Button className="w-full h-11 text-base font-semibold">
                Go to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
      <Card className="border-none shadow-2xl bg-background/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Reset password</CardTitle>
          <CardDescription className="text-base">
            Enter the OTP sent to your email and your new password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field
              name="email"
              validators={{ onChange: resetPasswordSchema.shape.email }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Email"
                  type="email"
                  placeholder="name@example.com"
                  prepend={<Mail className="size-4 text-muted-foreground" />}
                  disabled={!!emailFromQuery}
                />
              )}
            </form.Field>

            <form.Field
              name="otp"
              validators={{ onChange: resetPasswordSchema.shape.otp }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="OTP"
                  type="text"
                  placeholder="123456"
                  prepend={<KeyRound className="size-4 text-muted-foreground" />}
                />
              )}
            </form.Field>

            <form.Field
              name="newPassword"
              validators={{ onChange: resetPasswordSchema.shape.newPassword }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  prepend={<Lock className="size-4 text-muted-foreground" />}
                  append={
                    <Button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-transparent"
                    >
                      {showPassword ? (
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
                  pendingLabel="Resetting..."
                  className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Reset Password
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t bg-muted/30 py-4 rounded-b-lg">
          <Link
            href="/login"
            className="text-sm font-medium text-primary hover:underline flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
