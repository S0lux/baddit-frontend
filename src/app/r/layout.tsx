import { Inter } from "next/font/google";
import Header from "@/src/components/dashboard/header/header";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { ThemeProvider } from "next-themes";
import ModalManager from "@/src/components/auth-modal-manager/modal-manager";
import DashboardLayout from "@/src/components/dashboard/dashboard-layout/layout";

const inter = Inter({ subsets: ["latin"] });

export default function rLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
