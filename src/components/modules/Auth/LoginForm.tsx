"use client";

import { userLogin } from "@/app/(commonLayout)/(auth)/login/_action";
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
import { loginSchema, TLoginPayload } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface LoginFormProps {
  redirectPath?: string;
}

const LoginForm = ({ redirectPath }: LoginFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: TLoginPayload) => userLogin(payload, redirectPath),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const result = (await mutateAsync(value)) as any;

        if (!result.success) {
          setServerError(result.message || "Login failed. Please try again.");
          return;
        }
      } catch (error: any) {
        console.error("Login error:", error);
        setServerError(error.message || "An unexpected error occurred.");
      }
    },
  });

  return (
    <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
      <Card className="border-none shadow-2xl bg-background/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center text-base">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            method="POST"
            action="#"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit(e);
            }}
            className="space-y-5"
          >
            <form.Field
              name="email"
              validators={{ onChange: loginSchema.shape.email }}
            >
              {(field) => (
                <div className="space-y-1">
                  <AppField
                    field={field}
                    label="Email"
                    type="email"
                    placeholder="name@example.com"
                    prepend={<Mail className="size-4 text-muted-foreground" />}
                  />
                </div>
              )}
            </form.Field>

            <form.Field
              name="password"
              validators={{ onChange: loginSchema.shape.password }}
            >
              {(field) => (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline underline-offset-4 font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <AppField
                    field={field}
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
                          <EyeOff
                            className="size-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                        ) : (
                          <Eye
                            className="size-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                        )}
                      </Button>
                    }
                  />
                </div>
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
                  isPending={isSubmitting || isPending}
                  disabled={!canSubmit}
                  pendingLabel="Signing in..."
                  className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign In
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground font-medium tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-11 font-medium transition-all hover:bg-accent hover:text-accent-foreground flex items-center justify-center gap-3"
            onClick={() => {
              const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
              window.location.href = `${baseUrl}/auth/login/google`;
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google Account
          </Button>

          <div className="mt-8">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 text-center">
              Quick Demo Access
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Admin",
                  email: "arsaad.dev@gmail.com",
                  pass: "superadminpassword",
                },
                {
                  label: "Doctor",
                  email: "arsaad00.official@gmail.com",
                  pass: "doctorpassword1234",
                },
                {
                  label: "Patient",
                  email: "arsaad.2016@gmail.com",
                  pass: "patientpassword1234",
                },
              ].map((demo) => (
                <Button
                  key={demo.label}
                  variant="secondary"
                  size="sm"
                  className="text-[10px] h-9 font-bold bg-secondary/50 hover:bg-secondary border-none"
                  onClick={() => {
                    form.setFieldValue("email", demo.email);
                    form.setFieldValue("password", demo.pass);
                    setTimeout(() => form.handleSubmit(), 100);
                  }}
                >
                  {demo.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center border-t bg-muted/30 py-4 rounded-b-lg">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-bold hover:underline underline-offset-4"
            >
              Create one now
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
