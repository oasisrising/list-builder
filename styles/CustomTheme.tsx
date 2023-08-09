import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

export const LIGHT_GREY = '#dfe2e1';
export const DARK_GREY = '#3e1844';
// TYRANIDS '#3e1844'
// GREY KNIGHTS '#4a6570';
export const DARKER_GREY = '#121316';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export const themeOptions: ThemeOptions = {
  spacing: 8,
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1300,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: DARK_GREY,
      paper: LIGHT_GREY,
    },
  },
  typography: {
    fontFamily: 'Nunito Sans, Helvetica, Noto Sans',
    body1: {
      fontWeight: 600,
      color: DARKER_GREY,
    },
    h1: {
      fontSize: '2rem',
      textTransform: 'uppercase',
      fontWeight: 800,
    },
    h2: {
      fontSize: '1.5rem',
      textTransform: 'uppercase',
      fontWeight: 800,
    },
    h3: {
      fontSize: '1rem',
      textTransform: 'uppercase',
      color: 'white',
      fontWeight: 800,
    },

    subtitle2: {
      fontSize: '.75rem',
      textTransform: 'uppercase',
      color: DARK_GREY,
      fontWeight: 400,
    },
  },
  components: {
    MuiTableBody: {
      styleOverrides: {
        root: {
          'tr:last-child': { borderBottomStyle: 'none' },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export const CustomTheme: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
