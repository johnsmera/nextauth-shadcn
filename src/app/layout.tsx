import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-vietnam-pro",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Siberia",
  description: "Sistema de gestão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(`${beVietnamPro.variable} antialiased`)}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
