import tailwindcss from "@tailwindcss/vite";
import Aura from "@primeuix/themes/aura";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css", "~/assets/layout/layout.scss"],
  modules: ["@primevue/nuxt-module", "@nuxtjs/i18n"],
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
