// Página de Bienvenida / Login
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard'); // Si está autenticado, lo redirige al dashboard
      }
    });
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard'); // Redirige al Dashboard después de iniciar sesión
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a SolApp</h1>
      <p className="mb-4">Tu asistente de gestión nutricional</p>
      <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">Iniciar sesión con Google</button>
    </div>
  );
}