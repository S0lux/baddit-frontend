import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/dashboard/header/header";
import Sidebar from "../components/dashboard/sidebar/sidebar";
import { ThemeProvider } from "next-themes";

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
        className={`${inter.className} min-h-screen flex flex-col bg-background`}
      >
        <ThemeProvider attribute="class" enableSystem={true}>
          <div className="z-50">
            <Header />
          </div>
          <div className="flex flex-row flex-1 mt-[56.8px] z-0">
            <Sidebar />
            <div className="ml-[240px]">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
