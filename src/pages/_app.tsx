import type { AppProps } from 'next/app';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthGuard } from '@/components/auth/AuthGuard';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@mui/material/styles';
import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import { globalStyles } from '@/styles/globals';
import { SnackbarProvider } from 'notistack';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const isPublicPage = ['/login', '/signup', '/reset-password'].includes(pageProps.router?.pathname);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          {isPublicPage ? (
            <Component {...pageProps} />
          ) : (
            <AuthGuard>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthGuard>
          )}
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default MyApp; 