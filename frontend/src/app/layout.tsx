import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PrimeProvider from "@/shared/ui/providers/PrimeProvider";
import AnimationProvider from "@/shared/ui/providers/AnimationProvider";
import "primeicons/primeicons.css";
// import "primeflex/primeflex.css";
import "./globals.css";
import { Inter } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configure the Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ingeniería y Calidad Marina C.A. | INCAMAR",
  description:
    "Soluciones Subacuáticas y Mantenimiento de Clase Mundial. Somos un grupo de profesionales con un solo objetivo: aportar nuevos conocimientos y desarrollo al área de mantenimiento marino.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
      >
        <AnimationProvider>
          <PrimeProvider>{children}</PrimeProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
