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
  title: "In-sait · Datos, analítica y automatización de procesos",
  description:
    "Conectamos los sistemas de tu empresa en un solo tablero y automatizamos los reportes que hoy se arman a mano. Sabé dónde ganás, dónde perdés y por qué.",
  openGraph: {
    title: "In-sait · Data Insights, Always On.",
    description:
      "Consultoría en datos, analítica y automatización de procesos para empresas medianas y grandes.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      {/* Space Grotesk: la usa el badge de alianza con Zulpik. Link tal como
          lo pasaron ellos. El preconnect no venía en su snippet — lo agrego
          porque sin él la fuente llega bastante más tarde y el logo parpadea
          con la tipografía de fallback antes de acomodarse. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* precedence lo pide React 19 para poder izarlo al <head>; sin eso
          queda suelto en el <body> y rompe la hidratación.
          El lint pide meter las fuentes en pages/_document.js: esa regla es del
          Pages Router. Acá el link vive en el root layout, que aplica a todo
          el sitio, así que es el equivalente correcto. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap"
        rel="stylesheet"
        precedence="default"
      />
      <body>{children}</body>
    </html>
  );
}
