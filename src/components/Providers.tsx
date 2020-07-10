import React, { FC } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#40b6de',
    },
    secondary: {
      main: '#f0623e',
    },
    success: {
      main: '#87d415',
    },
  },
});

export const Providers: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
