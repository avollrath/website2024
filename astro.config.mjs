import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://avollrath.github.io',
  output: 'static',
  outDir: './docs',
  build: {
    assets: 'astro'
  }
});