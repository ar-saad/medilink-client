"use client";

import {
  handleResendOTP,
  handleVerifyEmail,
} from "@/app/(commonLayout)/(auth)/verify-email/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import {
  KeyRound,
  Mail,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getDefaultDashboardRoute, UserRole } from "@/lib/authUtils";

const VerifyEmailForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const { mutateAsync: verifyEmail, isPending: isVerifying } = useMutation({
    mutationFn: handleVerifyEmail,
  });

  const { mutateAsync: resendOTP, isPending: isResending } = useMutation({
    mutationFn: handleResendOTP,
  });

  const form = useForm({
    defaultValues: {
      email: emailFromQuery,
      otp: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const result = await verifyEmail(value);

        if (!result || !result.success) {
          setServerError(result?.message || "Verification failed.");
          return;
        }

        setIsSuccess(true);
        toast.success("Email verified successfully!");

        // Extract user role for redirection
        const user = result.data?.user;
        const role = user?.role;

        setTimeout(() => {
          if (role) {
            const targetPath = getDefaultDashboardRoute(role as UserRole);
            router.push(targetPath);
          } else {
            router.push("/login");
          }
        }, 2000);
      } catch (error: any) {
        console.error("Verification error:", error);
        setServerError(error.message || "An unexpected error occurred.");
      }
    },
  });

  // Sync email from query params if it changes
  useEffect(() => {
    if (emailFromQuery) {
      form.setFieldValue("email", emailFromQuery);
    }
  }, [emailFromQuery, form]);

  const handleResend = async () => {
    const email = form.getFieldValue("email");

    if (!email) {
      toast.error("Please enter your email address to resend the code.");
      setServerError("Email is required to resend verification code.");
      return;
    }

    if (resendCooldown > 0 || isResending) return;

    try {
      const result = await resendOTP(email);
      if (result && result.success) {
        toast.success("New OTP sent to your email.");
        setResendCooldown(60); // 1 minute cooldown
        setServerError(null);
      } else {
        toast.error(result?.message || "Failed to resend OTP.");
        setServerError(result?.message || "Failed to resend OTP.");
      }
    } catch (error: any) {
      toast.error("An error occurred while resending OTP.");
    }
  };

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
            <CardTitle className="text-3xl font-bold tracking-tight text-primary">
              Email Verified!
            </CardTitle>
            <CardDescription className="text-base pt-2 font-medium">
              Your account is now active and ready to use.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <p className="text-sm text-muted-foreground mb-6">
              You will be redirected to the dashboard in a few seconds...
            </p>
            <Link href="/dashboard">
              <Button className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.02]">
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
      <Card className="border-none shadow-2xl bg-background/80 backdrop-blur-sm border-t-4 border-t-primary">
        <CardHeader className="space-y-2 pb-6 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Verify your email
          </CardTitle>
          <CardDescription className="text-base">
            We've sent a 6-digit verification code to{" "}
            <span className="font-semibold text-foreground">
              {emailFromQuery || "your email"}
            </span>
            .
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
              validators={{
                onChange: ({ value }) =>
                  !value ? "Email is required" : undefined,
              }}
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
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "OTP is required";
                  if (value.length !== 6) return "OTP must be 6 digits";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Verification Code"
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  prepend={
                    <KeyRound className="size-4 text-muted-foreground" />
                  }
                />
              )}
            </form.Field>

            {serverError && (
              <Alert
                variant="destructive"
                className="animate-in slide-in-from-top-2 duration-300"
              >
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isSubmitting || isVerifying}
                  disabled={!canSubmit}
                  pendingLabel="Verifying..."
                  className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Verify Email
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0 || isResending}
                className="text-primary font-bold hover:underline disabled:opacity-50 disabled:no-underline transition-all flex items-center gap-1 mx-auto mt-1"
              >
                {isResending ? (
                  <RefreshCw className="size-3 animate-spin" />
                ) : null}
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : "Resend code"}
              </button>
            </p>
          </div>
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

export default VerifyEmailForm;
