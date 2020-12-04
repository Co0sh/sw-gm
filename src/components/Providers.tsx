import React, { FC } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from '../logic/theme';
import NavigationManager from './NavigationManager';

export const Providers: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationManager>
        <CssBaseline />
        {children}
      </NavigationManager>
    </ThemeProvider>
  );
};
