'use client';

import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { ReactNode } from 'react';
import { FactionDataContext } from '../providers/FactionDataProvider/FactionDataContext';

export const LIGHT_GREY = '#dfe2e1';
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

export function getThemeOptions(colorOverride: string): ThemeOptions {
  return {
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
        default: colorOverride,
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
        color: colorOverride,
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
}

export const CustomTheme: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const { currentFaction, allFactionData } =
    React.useContext(FactionDataContext);

  const theme = React.useMemo(
    () =>
      createTheme(
        getThemeOptions(
          allFactionData.find((faction) => faction.id === currentFaction)
            ?.color ?? '#555555'
        )
      ),
    [currentFaction]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
