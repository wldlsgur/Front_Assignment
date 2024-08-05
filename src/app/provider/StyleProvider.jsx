import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '@/app/styles';

const StyleProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default StyleProvider;
