import { Inter } from "next/font/google";
import Header from "@/src/components/dashboard/header/header";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { ThemeProvider } from "next-themes";
import ModalManager from "@/src/components/auth-modal-manager/modal-manager";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider attribute="class" enableSystem={true}>
        <Header />
        <div className="mt-[56.8px] flex flex-1 flex-row">
          <Sidebar />
          <div className="ml-[240px] flex flex-1 flex-col items-center">
            {children}
          </div>
        </div>
        <div id="modal-portal"></div>
      </ThemeProvider>
    </>
  );
}
