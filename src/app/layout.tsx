import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/dashboard/header/header";
import Sidebar from "../components/dashboard/sidebar/sidebar";
import { Theme_Provider } from "../components/theme-provider/provider";

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
        className={`${inter.className} h-screen  min-h-screen flex flex-col px-[10px]`}
      >
        <Theme_Provider>
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <div className=" flex-1 flex justify-center items-center">
              {children}
            </div>
          </div>
        </Theme_Provider>
      </body>
    </html>
  );
}
