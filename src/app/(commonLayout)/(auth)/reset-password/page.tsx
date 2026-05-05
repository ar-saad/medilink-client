import ResetPasswordForm from "@/components/modules/Auth/ResetPasswordForm";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] py-12 px-4 bg-linear-to-br from-background via-primary/5 to-background">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
