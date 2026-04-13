import LoginForm from "@/components/modules/Auth/LoginForm";

interface LoginParams {
  searchParams: Promise<{ redirect?: string }>;
}

const LoginPage = async ({ searchParams }: LoginParams) => {
  const params = await searchParams;
  const redirectPath = params.redirect;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginForm redirectPath={redirectPath} />
    </div>
  );
};

export default LoginPage;
