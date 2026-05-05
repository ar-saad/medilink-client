import RegisterForm from "@/components/modules/Auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] py-12 px-4 bg-linear-to-br from-background via-primary/5 to-background">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
