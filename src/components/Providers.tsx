import React, { FC } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from '../logic/theme';

export const Providers: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
