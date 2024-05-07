import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/dashboard/header/header";
import { Sidebar } from "../components/dashboard/sidebar";
import { ThemeProvider } from "next-themes";
import ModalManager from "../components/auth-modal-manager/modal-manager";
import Providers from "../components/theme-provider/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "baddit",
  description: "baddit for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-background`}
      >
        <Providers>
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
          <ModalManager></ModalManager>
        </Providers>
      </body>
    </html>
  );
}
