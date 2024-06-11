import ModalManager from "@/src/components/auth-modal-manager/modal-manager";

import Header from "@/src/layout/components/header/header";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function HeaderOnlyLayout({
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
