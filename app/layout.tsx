import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Chronos-Dev | Software Development & AI Integration",
  description:
    "Agencia de desarrollo web y automatización con IA en Guatemala. Tiendas en línea, chatbots, landing pages y más.",
  keywords: [
    "desarrollo web guatemala",
    "ecommerce guatemala",
    "chatbot ia",
    "automatizacion python",
    "next.js guatemala",
    "chronos dev",
  ],
  openGraph: {
    title: "Chronos-Dev | Software & AI Integration",
    description: "Soluciones digitales que no se quedan en el tiempo.",
    url: "https://chronos-dev.com",
    siteName: "Chronos-Dev",
    locale: "es_GT",
    type: "website",
  },
  metadataBase: new URL("https://chronos-dev.com"),
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
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
    </html>
  );
}
