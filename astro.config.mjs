// @ts-check
import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify";

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), auth()],
  output:'server',
  adapter: netlify(),
});