import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';

export default defineConfig({

    integrations: [solid()],
    site: 'https://avollrath.github.io',
});


