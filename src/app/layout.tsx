import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout";
import { AuthProvider } from "@/lib/auth";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sadeci Platform",
  description: "Plataforma de gestión Sadeci",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} antialiased bg-zinc-50 text-zinc-900`}
      >
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
