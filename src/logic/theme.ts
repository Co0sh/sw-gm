import { unstable_createMuiStrictModeTheme } from '@material-ui/core';

export const theme = unstable_createMuiStrictModeTheme({
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
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});
