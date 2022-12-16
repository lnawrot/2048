import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['src/**/*.{test,spec}.{ts,mts,jsx,tsx}'],
      globals: true,
      environment: 'happy-dom',
      setupFiles: './src/test/setup.ts',
    },
  })
);
