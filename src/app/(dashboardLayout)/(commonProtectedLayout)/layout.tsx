export default function CommonProtectedDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      Common Protected Dashboard Layout
      {children}
    </>
  );
}
