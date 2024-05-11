import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DropdownMenu } from "../components/dropdown";
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
        className={`${inter.className} flex min-h-screen flex-col bg-background`}
      >
        <ThemeProvider
          enableColorScheme={true}
          enableSystem={true}
          attribute="class"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
