import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import DashboardLayout from "../components/dashboard/dashboard-layout/layout";
import { DropdownMenu } from "../components/dropdown";

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
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          enableColorScheme={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
