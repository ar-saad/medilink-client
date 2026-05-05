import VerifyEmailForm from "@/components/modules/Auth/VerifyEmailForm";
import { Suspense } from "react";

const VerifyEmailPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailForm />
      </Suspense>
    </div>
  );
};

export default VerifyEmailPage;
