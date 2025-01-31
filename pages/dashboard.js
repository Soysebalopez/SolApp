import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [patients, setPatients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push('/');
      } else {
        setUser(currentUser);
        fetchPatients();
      }
    });
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
    <div className="p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Lista de Pacientes</h2>
      <ul className="list-disc pl-5">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <li key={patient._id} className="py-1 cursor-pointer text-blue-500" onClick={() => router.push(`/paciente/${patient._id}`)}>
              {patient.nombre}
            </li>
          ))
        ) : (
          <p>No hay pacientes registrados.</p>
        )}
      </ul>
      <button onClick={() => router.push('/nuevo-paciente')} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Agregar Paciente</button>
    </div>
  );
}