import LoginForm from "@/components/modules/Auth/LoginForm";

interface LoginParams {
  searchParams: Promise<{ redirect?: string }>;
}

const LoginPage = async ({ searchParams }: LoginParams) => {
  const params = await searchParams;
  const redirectPath = params.redirect;

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] py-12 px-4 bg-linear-to-br from-background via-primary/5 to-background">
      <LoginForm redirectPath={redirectPath} />
    </div>
  );
};

export default LoginPage;
