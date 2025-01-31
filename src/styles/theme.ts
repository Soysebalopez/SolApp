import type { ThemeOptions } from '@mui/material/styles';
import { createTheme as createMuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      main: string;
      light: string;
      dark: string;
    };
  }
  interface PaletteOptions {
    neutral?: {
      main: string;
      light: string;
      dark: string;
    };
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#007AFF', // iOS blue
      light: '#5856D6',
      dark: '#0062CC',
    },
    secondary: {
      main: '#FF2D55', // iOS pink
      light: '#FF6482',
      dark: '#C41E3A',
    },
    neutral: {
      main: '#8E8E93',
      light: '#AEAEB2',
      dark: '#636366',
    },
    background: {
      default: '#F2F2F7',
      paper: '#FFFFFF',
    },
    error: {
      main: '#FF3B30', // iOS red
    },
    success: {
      main: '#34C759', // iOS green
    },
    warning: {
      main: '#FF9500', // iOS orange
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '34px',
      fontWeight: 700,
      letterSpacing: '-0.022em',
    },
    h2: {
      fontSize: '28px',
      fontWeight: 700,
      letterSpacing: '-0.021em',
    },
    h3: {
      fontSize: '22px',
      fontWeight: 600,
      letterSpacing: '-0.020em',
    },
    body1: {
      fontSize: '17px',
      letterSpacing: '-0.019em',
    },
    body2: {
      fontSize: '15px',
      letterSpacing: '-0.018em',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          fontSize: '17px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
          borderRadius: '12px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
};

const theme = createMuiTheme(themeOptions);

export default theme; 