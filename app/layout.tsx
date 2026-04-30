import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Chronos-Dev | Empresa de Desarrollo de Software y Web en Guatemala",
  description:
    "Agencia de desarrollo de software, páginas web y automatización con IA en Guatemala y San Marcos. Creamos la página web ideal para tu negocio.",
  keywords: [
    "empresa de desarrollo de software guatemala",
    "desarrollo web guatemala",
    "empresas de desarrollo en san marcos",
    "pagina web para mi negocio",
    "paginas de desarrollo web",
    "agencia de software guatemala",
    "ecommerce guatemala",
    "crear pagina web guatemala",
    "chronos",
    "chronos dev",
  ],
  openGraph: {
    title: "Chronos-Dev | Desarrollo de Software y Web en Guatemala",
    description: "Creamos la página web ideal para tu negocio. Agencia en Guatemala y San Marcos.",
    url: "https://www.chronos-dev.com",
    siteName: "Chronos-Dev",
    locale: "es_GT",
    type: "website",
  },
  alternates: {
    canonical: "./",
  },
  metadataBase: new URL("https://www.chronos-dev.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" style={{ colorScheme: "only dark" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#131a13" />
      </head>
      <body className={inter.variable}>{children}</body>
      <GoogleAnalytics gaId="G-X008RML142" />
    </html>
  );
}
