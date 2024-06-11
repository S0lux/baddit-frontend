import { Inter } from "next/font/google";
import DefaultLayout from "@/src/layout/default-layout/layout";

const inter = Inter({ subsets: ["latin"] });

export default function rLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
