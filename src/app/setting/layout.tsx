import ModalManager from "@/src/components/auth-modal-manager/modal-manager";
import DashboardLayout from "@/src/components/dashboard/dashboard-layout/layout";
import Header from "@/src/components/dashboard/header/header";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import RootLayout from "../layout";
const inter = Inter({ subsets: ["latin"] });

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
}
