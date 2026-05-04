import CommonFooter from "@/components/shared/CommonFooter";
import CommonNavbar from "@/components/shared/CommonNavbar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CommonNavbar />
      <main className="flex-grow">{children}</main>
      <CommonFooter />
    </>
  );
}
