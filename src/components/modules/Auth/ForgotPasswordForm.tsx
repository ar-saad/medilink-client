"use client";

import { handleForgetPassword } from "@/app/(commonLayout)/(auth)/forgot-password/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { forgetPasswordSchema, TForgetPasswordPayload } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: TForgetPasswordPayload) => handleForgetPassword(payload),
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const result = await mutateAsync(value);

        if (!result.success) {
          setServerError(result.message || "Failed to send reset link.");
          return;
        }

        setIsSuccess(true);
        toast.success("Reset OTP sent to your email.");
      } catch (error: any) {
        console.error("Forgot password error:", error);
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
            <CardTitle className="text-3xl font-bold tracking-tight">Check your email</CardTitle>
            <CardDescription className="text-base pt-2">
              We've sent a password reset OTP to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <p className="text-sm text-muted-foreground mb-6">
              Please enter the OTP on the next page to reset your password.
            </p>
            <Link href={`/reset-password?email=${form.getFieldValue("email")}`}>
              <Button className="w-full h-11 text-base font-semibold">
                Proceed to Reset Password
              </Button>
            </Link>
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
  }

  return (
    <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
      <Card className="border-none shadow-2xl bg-background/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Forgot password?</CardTitle>
          <CardDescription className="text-base">
            No worries, we'll send you an OTP to reset your password.
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
              validators={{ onChange: forgetPasswordSchema.shape.email }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Email"
                  type="email"
                  placeholder="name@example.com"
                  prepend={<Mail className="size-4 text-muted-foreground" />}
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
                  pendingLabel="Sending OTP..."
                  className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send Reset OTP
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

export default ForgotPasswordForm;
