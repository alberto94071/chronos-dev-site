import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chronos-Dev | Software & AI Integration",
    short_name: "Chronos-Dev",
    description: "Agencia de desarrollo web y automatización con IA en Guatemala.",
    start_url: "/",
    display: "standalone",
    background_color: "#131a13",
    theme_color: "#131a13",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
