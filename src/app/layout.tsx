import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "../fonts/InterVariable.ttf",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "In-sait · Datos, analítica e ingeniería de software",
  description:
    "Consultora de datos, analítica e ingeniería de software. Convertimos información dispersa en decisiones confiables y automatizamos procesos.",
  openGraph: {
    title: "In-sait · Data Insights, Always On.",
    description:
      "Consultora de datos, analítica e ingeniería de software para empresas medianas y grandes.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
