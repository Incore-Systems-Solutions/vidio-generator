// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
// Configuration for mobile build (Capacitor)
export default defineConfig({
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
