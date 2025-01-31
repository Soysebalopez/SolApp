// Página de Lista de Pacientes
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function ListaPacientes() {
  const [patients, setPatients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('https://tuapi.com/pacientes'); // Reemplaza con la URL correcta de tu API
      setPatients(response.data);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Lista de Pacientes</h2>
      <button onClick={() => router.push('/nuevo-paciente')} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">
        + Agregar Paciente
      </button>
      <ul className="list-disc pl-5">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <li key={patient._id} className="py-2 cursor-pointer text-blue-500" onClick={() => router.push(`/paciente/${patient._id}`)}>
              {patient.nombre} - {patient.edad} años
            </li>
          ))
        ) : (
          <p>No hay pacientes registrados.</p>
        )}
      </ul>
    </div>
  );
}