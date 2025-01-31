// Página de Historial Clínico y Nutricional de un Paciente
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function HistorialPaciente() {
  const router = useRouter();
  const { id } = router.query;
  const [historial, setHistorial] = useState(null);

  useEffect(() => {
    if (id) {
      fetchHistorial();
    }
  }, [id]);

  const fetchHistorial = async () => {
    try {
      const response = await axios.get(`https://tuapi.com/pacientes/${id}/historial`); // Reemplaza con la URL de tu API
      setHistorial(response.data);
    } catch (error) {
      console.error('Error al obtener el historial del paciente:', error);
    }
  };

  if (!historial) return <p>Cargando historial...</p>;

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Historial Clínico y Nutricional</h2>

      <h3 className="text-xl font-bold mt-4">Historia Clínica</h3>
      <p><strong>Embarazo e historia perinatal:</strong> {historial.embarazo}</p>
      <p><strong>Enfermedades actuales:</strong> {historial.enfermedad_actual}</p>
      <p><strong>Antecedentes patológicos:</strong> {historial.patologicos}</p>
      <p><strong>Aspectos socioeconómicos:</strong> {historial.socioeconomicos}</p>
      <p><strong>Antecedentes familiares:</strong> {historial.familiares}</p>
      <p><strong>Hábitos del paciente:</strong> {historial.habitos}</p>

      <h3 className="text-xl font-bold mt-4">Progresión del Peso y Talla</h3>
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Fecha</th>
            <th className="border border-gray-400 p-2">Edad</th>
            <th className="border border-gray-400 p-2">Peso</th>
            <th className="border border-gray-400 p-2">Talla</th>
            <th className="border border-gray-400 p-2">IMC</th>
          </tr>
        </thead>
        <tbody>
          {historial.peso_talla?.map((registro, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-400 p-2">{registro.fecha}</td>
              <td className="border border-gray-400 p-2">{registro.edad}</td>
              <td className="border border-gray-400 p-2">{registro.peso}</td>
              <td className="border border-gray-400 p-2">{registro.talla}</td>
              <td className="border border-gray-400 p-2">{registro.imc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-bold mt-4">Diagnóstico Nutricional</h3>
      <p>{historial.diagnostico_nutricional}</p>

      <h3 className="text-xl font-bold mt-4">Evolución Nutricional</h3>
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Fecha</th>
            <th className="border border-gray-400 p-2">Edad</th>
            <th className="border border-gray-400 p-2">Peso</th>
            <th className="border border-gray-400 p-2">Talla</th>
            <th className="border border-gray-400 p-2">IMC</th>
            <th className="border border-gray-400 p-2">Evolución</th>
          </tr>
        </thead>
        <tbody>
          {historial.evolucion?.map((registro, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-400 p-2">{registro.fecha}</td>
              <td className="border border-gray-400 p-2">{registro.edad}</td>
              <td className="border border-gray-400 p-2">{registro.peso}</td>
              <td className="border border-gray-400 p-2">{registro.talla}</td>
              <td className="border border-gray-400 p-2">{registro.imc}</td>
              <td className="border border-gray-400 p-2">{registro.evolucion}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => router.back()} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">Volver</button>
    </div>
  );
}