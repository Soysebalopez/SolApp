import { css, type Theme } from '@emotion/react';

export const globalStyles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* iOS-style tap highlight color */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  
  /* iOS-style momentum scrolling */
  -webkit-overflow-scrolling: touch;
`; 