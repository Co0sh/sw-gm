import React, { FC } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { theme } from '../logic/theme';
import NavigationManager from './NavigationManager';

const queryCache = new QueryCache();

export const Providers: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <NavigationManager>
          <CssBaseline />
          {children}
        </NavigationManager>
      </ReactQueryCacheProvider>
    </ThemeProvider>
  );
};
