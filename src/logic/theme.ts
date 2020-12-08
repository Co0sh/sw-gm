import { unstable_createMuiStrictModeTheme } from '@material-ui/core';

export const theme = unstable_createMuiStrictModeTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#40b6de',
    },
    secondary: {
      main: '#b72a2a',
    },
    success: {
      main: '#87d415',
    },
  },
  typography: {
    caption: {
      opacity: 0.8,
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});
