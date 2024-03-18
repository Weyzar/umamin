import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@umamin/ui/globals.css";
import { cn } from "@ui/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "bg-background text-foreground dark")}
      >
        {children}
      </body>
    </html>
  );
}
