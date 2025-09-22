// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server", // Enable server-side rendering
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: true,
      allowedHosts: ["www.instantvideoapp.com", "instantvideoapp.com"],
    },
  },

  adapter: node({ mode: "standalone" }),

  integrations: [react()],
});
