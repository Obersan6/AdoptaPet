
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // This enables globals like describe, test, expect, etc.
    environment: 'jsdom', // Ensures browser-like environment
    setupFiles: ['./src/setupTests.js'], // Runs global test setup
  },
});
