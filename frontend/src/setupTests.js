
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';


// Ensure cleanup after each test
afterEach(() => {
  cleanup();
});

