import type { useState } from 'react';
import React from 'react';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { useRouter } from 'next/router';
import { Button, Container, Typography, Box } from '@mui/material';

const Login: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      setError('Failed to login with Google');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
        {error && (
          <Typography color="error">
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Login; 