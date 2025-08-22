import "./globals.css";
import Navbar from "@/components/Navbar";
import { zhCN } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Hanasu",
  description: "你最好的学习伙伴",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={zhCN}
      appearance={{ variables: { colorPrimary: "#fe5933" } }}
    >
      <html lang="zh">
        <body className={"bg-background text-foreground antialiased"}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
