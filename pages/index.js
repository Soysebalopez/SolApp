// Mejorada navegación y conexión entre todas las páginas

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import axios from 'axios';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      }
    });
  }, []);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-12 lg:px-20">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Bienvenido a SolApp</h1>
        <p className="text-lg text-gray-600 mb-8">Tu asistente de gestión nutricional</p>
        <button 
          onClick={handleLogin} 
          className="w-full max-w-sm px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md transition duration-300">
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
}

export function Dashboard() {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('https://tuapi.com/pacientes');
      setPatients(response.data);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen flex flex-col items-center">
      <nav className="w-full max-w-4xl flex justify-between mb-6 p-4 border-b">
        <Link href="/dashboard" className="text-lg font-medium text-gray-700 hover:text-gray-900">Dashboard</Link>
        <Link href="/pacientes" className="text-lg font-medium text-gray-700 hover:text-gray-900">Pacientes</Link>
        <Link href="/turnos" className="text-lg font-medium text-gray-700 hover:text-gray-900">Turnos</Link>
        <Link href="/perfil" className="text-lg font-medium text-gray-700 hover:text-gray-900">Perfil</Link>
      </nav>
      <h2 className="text-3xl font-bold mb-6">Lista de Pacientes</h2>
      <button 
        onClick={() => router.push('/nuevo-paciente')} 
        className="mb-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md">
        + Agregar Paciente
      </button>
      <ul className="w-full max-w-lg list-disc pl-5 text-gray-700">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <li key={patient._id} className="py-2 cursor-pointer text-blue-500 hover:text-blue-700">
              <Link href={`/paciente/${patient._id}`}>{patient.nombre} - {patient.edad} años</Link>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No hay pacientes registrados.</p>
        )}
      </ul>
    </div>
  );
}