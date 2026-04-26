import CommonNavbar from "@/components/shared/CommonNavbar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CommonNavbar />
      {children}
    </>
  );
}
