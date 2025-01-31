import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login'); // Asegúrate de tener una página de login
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <p>Redirigiendo...</p>;
}