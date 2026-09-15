import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "In-sait · Datos, analítica y automatización de procesos",
    short_name: "In-sait",
    description:
      "Conectamos los sistemas de tu empresa en un solo tablero y automatizamos los reportes que hoy se arman a mano.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2b2d33",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
