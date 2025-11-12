import tailwindcss from "@tailwindcss/vite";
import Aura from "@primeuix/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: true,
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:3000/api",
    },
    // apiKey: process.env.API_KEY || "",
  },
  css: ["~/assets/css/main.css", "~/assets/layout/layout.scss"],
  modules: ["@primevue/nuxt-module", "@nuxtjs/i18n", "@pinia/nuxt"],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".app-dark",
        },
      },
    },
  },
  i18n: {
    defaultLocale: "la",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "la", name: "Laos", file: "la.json" },
    ],
  },
});
