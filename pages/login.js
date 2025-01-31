import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
        Iniciar sesión con Google
      </button>
    </div>
  );
}