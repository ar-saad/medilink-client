"use client";

import { userRegister } from "@/app/(commonLayout)/(auth)/register/_action";
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
import {
  registerBaseSchema,
  registerSchema,
  TRegisterPayload,
} from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: TRegisterPayload) => userRegister(payload),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const result = (await mutateAsync(value)) as any;

        if (!result.success) {
          setServerError(
            result.message || "Registration failed. Please try again.",
          );
          return;
        }
      } catch (error: any) {
        console.error("Registration error:", error);
        setServerError(error.message || "An unexpected error occurred.");
      }
    },
  });

  return (
    <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
      <Card className="border-none shadow-2xl bg-background/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center text-base">
            Join MediLink today and start managing your health better
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
            className="space-y-4"
          >
            <form.Field
              name="name"
              validators={{ onChange: registerBaseSchema.shape.name }}
            >
              {(field) => (
                <div className="space-y-1">
                  <AppField
                    field={field}
                    label="Full Name"
                    placeholder="John Doe"
                    prepend={<User className="size-4 text-muted-foreground" />}
                  />
                </div>
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{ onChange: registerBaseSchema.shape.email }}
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
              validators={{ onChange: registerBaseSchema.shape.password }}
            >
              {(field) => (
                <div className="space-y-1">
                  <AppField
                    field={field}
                    label="Password"
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

            <form.Field
              name="confirmPassword"
              validators={{
                onChange: registerBaseSchema.shape.confirmPassword,
              }}
            >
              {(field) => (
                <div className="space-y-1">
                  <AppField
                    field={field}
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    prepend={<Lock className="size-4 text-muted-foreground" />}
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
                  pendingLabel="Creating account..."
                  className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] mt-2"
                >
                  Create Account
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
                Or join with
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
        </CardContent>

        <CardFooter className="flex justify-center border-t bg-muted/30 py-4 rounded-b-lg">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-bold hover:underline underline-offset-4"
            >
              Sign in here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;
