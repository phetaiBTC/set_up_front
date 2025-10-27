import tailwindcss from "@tailwindcss/vite";
import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  ssr: false,
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css"],
  modules: ["@primevue/nuxt-module", "@nuxtjs/i18n"],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        // options: {
        //   darkModeSelector: ".my-app-dark",
        // },
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
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3001/api",
    },
  },
});
