import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    alias: [
      {
        find: 'openapi-angular',
        replacement: resolve(__dirname, './projects/openapi-angular/src/public-api.ts'),
      },
    ],
  },
});
