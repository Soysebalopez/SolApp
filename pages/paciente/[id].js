// Página de Detalles de un Paciente
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function DetallePaciente() {
  const router = useRouter();
  const { id } = router.query; // Captura el ID del paciente desde la URL
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id]);

  const fetchPatient = async () => {
    try {
      const response = await axios.get(`https://tuapi.com/pacientes/${id}`); // Reemplaza con la URL de tu API
      setPatient(response.data);
    } catch (error) {
      console.error('Error al obtener detalles del paciente:', error);
    }
  };

  if (!patient) return <p>Cargando datos...</p>;

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{patient.nombre}</h2>
      <p><strong>Edad:</strong> {patient.edad} años</p>
      <p><strong>Cuidador:</strong> {patient.cuidador}</p>
      <p><strong>Pediatra:</strong> {patient.pediatra}</p>
      <p><strong>Teléfono del Cuidador:</strong> {patient.telefono}</p>

      <h3 className="text-xl font-bold mt-6">Motivo de Consulta</h3>
      <p>{patient.motivo_consulta}</p>

      <h3 className="text-xl font-bold mt-6">Historia Clínica y Nutricional</h3>
      <p><strong>Embarazo e historia perinatal:</strong> {patient.historia_clinica?.embarazo}</p>
      <p><strong>Enfermedades actuales:</strong> {patient.historia_clinica?.enfermedad_actual}</p>
      <p><strong>Antecedentes patológicos:</strong> {patient.historia_clinica?.patologicos}</p>
      <p><strong>Aspectos socioeconómicos:</strong> {patient.historia_clinica?.socioeconomicos}</p>
      <p><strong>Antecedentes familiares:</strong> {patient.historia_clinica?.familiares}</p>
      <p><strong>Hábitos:</strong> {patient.historia_clinica?.habitos}</p>

      <h3 className="text-xl font-bold mt-6">Diagnóstico Nutricional</h3>
      <p>{patient.diagnostico_nutricional}</p>

      <button onClick={() => router.back()} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">Volver</button>
    </div>
  );
}