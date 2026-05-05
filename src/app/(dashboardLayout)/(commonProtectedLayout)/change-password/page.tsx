import ChangePasswordForm from "@/components/modules/Common/PasswordManagement/ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Security</h1>
        <p className="text-muted-foreground text-lg">
          Change your password to keep your account secure.
        </p>
      </div>
      
      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
