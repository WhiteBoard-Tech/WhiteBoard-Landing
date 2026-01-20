import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "static",
  adapter: vercel({
    edgeMiddleware: true,
  }),
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false, // We handle redirect in middleware
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});