import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-host ready: emits a minimal standalone server in .next/standalone
  output: "standalone",

  async redirects() {
    return [
      // Canonicalizar a insait.com.ar (evita contenido duplicado www vs. apex).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.insait.com.ar" }],
        destination: "https://insait.com.ar/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // Assets de marca (logos, íconos) versionados a mano: cache largo.
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
