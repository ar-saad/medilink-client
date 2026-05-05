import ForgotPasswordForm from "@/components/modules/Auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] py-12 px-4 bg-linear-to-br from-background via-primary/5 to-background">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;
