import '@emotion/react';

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