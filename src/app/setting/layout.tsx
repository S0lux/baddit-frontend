import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
