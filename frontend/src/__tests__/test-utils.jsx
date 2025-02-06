import React from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';  

// A custom render function that wraps components with the necessary providers (AuthContext.Provider)
export const customRender = (ui, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>, // Wrap the component in AuthProvider
    ...options,
  });
