// Página de Evolución Nutricional de un Paciente
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function EvolucionPaciente() {
  const router = useRouter();
  const { id } = router.query;
  const [evolucion, setEvolucion] = useState([]);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    fecha: '',
    edad: '',
    peso: '',
    talla: '',
    imc: '',
    observaciones: ''
  });

  useEffect(() => {
    if (id) {
      fetchEvolucion();
    }
  }, [id]);

  const fetchEvolucion = async () => {
    try {
      const response = await axios.get(`https://tuapi.com/pacientes/${id}/evolucion`); // Reemplaza con la URL de tu API
      setEvolucion(response.data);
    } catch (error) {
      console.error('Error al obtener la evolución del paciente:', error);
    }
  };

  const handleChange = (e) => {
    setNuevoRegistro({ ...nuevoRegistro, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://tuapi.com/pacientes/${id}/evolucion`, nuevoRegistro); // Reemplaza con la URL de tu API
      setNuevoRegistro({ fecha: '', edad: '', peso: '', talla: '', imc: '', observaciones: '' });
      fetchEvolucion();
    } catch (error) {
      console.error('Error al agregar registro de evolución:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Evolución Nutricional</h2>

      <h3 className="text-xl font-bold mt-4">Historial de Evolución</h3>
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Fecha</th>
            <th className="border border-gray-400 p-2">Edad</th>
            <th className="border border-gray-400 p-2">Peso</th>
            <th className="border border-gray-400 p-2">Talla</th>
            <th className="border border-gray-400 p-2">IMC</th>
            <th className="border border-gray-400 p-2">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {evolucion.length > 0 ? (
            evolucion.map((registro, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-400 p-2">{registro.fecha}</td>
                <td className="border border-gray-400 p-2">{registro.edad}</td>
                <td className="border border-gray-400 p-2">{registro.peso}</td>
                <td className="border border-gray-400 p-2">{registro.talla}</td>
                <td className="border border-gray-400 p-2">{registro.imc}</td>
                <td className="border border-gray-400 p-2">{registro.observaciones}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border border-gray-400 p-2 text-center">
                No hay registros de evolución.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3 className="text-xl font-bold mt-4">Agregar Nuevo Registro</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="date" name="fecha" value={nuevoRegistro.fecha} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="number" name="edad" placeholder="Edad" value={nuevoRegistro.edad} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="number" step="0.1" name="peso" placeholder="Peso (kg)" value={nuevoRegistro.peso} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="number" step="0.1" name="talla" placeholder="Talla (cm)" value={nuevoRegistro.talla} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="number" step="0.1" name="imc" placeholder="IMC" value={nuevoRegistro.imc} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <textarea name="observaciones" placeholder="Observaciones" value={nuevoRegistro.observaciones} onChange={handleChange} className="border p-2 mb-2 w-full" />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Agregar Registro</button>
      </form>

      <button onClick={() => router.back()} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">Volver</button>
    </div>
  );
}