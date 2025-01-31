/// <reference types="react" />

import type { 
  FormEvent, 
  ChangeEvent, 
  ReactNode, 
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState 
} from 'react';

declare module 'react' {
  export * from 'react';
}

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
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

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      primary: {
        main: string;
        light: string;
        dark: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
      };
      neutral: {
        main: string;
        light: string;
        dark: string;
      };
    };
  }
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '@mui/material';
declare module '@emotion/react';
declare module 'firebase/app';

// Augment the window object
interface Window {
  firebase?: any;
}

declare module '@firebase/app' {
  export * from 'firebase/app';
}

declare module '@firebase/auth' {
  export * from 'firebase/auth';
}

declare module '@firebase/firestore' {
  export * from 'firebase/firestore';
}

declare module '@fullcalendar/core/index.js';
declare module '@fullcalendar/daygrid';
declare module '@fullcalendar/timegrid';
declare module '@fullcalendar/interaction';
declare module '@fullcalendar/react';
declare module '@mui/material/*';
declare module '@mui/icons-material/*';
declare module '@emotion/react';
declare module '@emotion/styled';
declare module '@mui/styles';
declare module '@date-io/date-fns';
declare module '@mui/x-date-pickers';
declare module 'notistack';
declare module '@hookform/resolvers/yup'; 