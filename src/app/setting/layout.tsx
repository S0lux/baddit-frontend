import { Inter } from "next/font/google";
import HeaderOnlyLayout from "@/src/layout/header-only/layout";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderOnlyLayout>{children}</HeaderOnlyLayout>
    </>
  );
}
