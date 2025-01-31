// Página de Gestión de Turnos
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Turnos() {
  const [turnos, setTurnos] = useState([]);
  const [nuevoTurno, setNuevoTurno] = useState({
    paciente: '',
    fecha: '',
    hora: '',
    motivo: ''
  });

  useEffect(() => {
    fetchTurnos();
  }, []);

  const fetchTurnos = async () => {
    try {
      const response = await axios.get('https://tuapi.com/turnos'); // Reemplaza con la URL de tu API
      setTurnos(response.data);
    } catch (error) {
      console.error('Error al obtener turnos:', error);
    }
  };

  const handleChange = (e) => {
    setNuevoTurno({ ...nuevoTurno, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://tuapi.com/turnos', nuevoTurno); // Reemplaza con la URL de tu API
      setNuevoTurno({ paciente: '', fecha: '', hora: '', motivo: '' });
      fetchTurnos();
    } catch (error) {
      console.error('Error al agendar turno:', error);
    }
  };

  const eliminarTurno = async (id) => {
    try {
      await axios.delete(`https://tuapi.com/turnos/${id}`); // Reemplaza con la URL de tu API
      fetchTurnos();
    } catch (error) {
      console.error('Error al eliminar turno:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestión de Turnos</h2>

      <h3 className="text-xl font-bold mt-4">Turnos Agendados</h3>
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Paciente</th>
            <th className="border border-gray-400 p-2">Fecha</th>
            <th className="border border-gray-400 p-2">Hora</th>
            <th className="border border-gray-400 p-2">Motivo</th>
            <th className="border border-gray-400 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.length > 0 ? (
            turnos.map((turno, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-400 p-2">{turno.paciente}</td>
                <td className="border border-gray-400 p-2">{turno.fecha}</td>
                <td className="border border-gray-400 p-2">{turno.hora}</td>
                <td className="border border-gray-400 p-2">{turno.motivo}</td>
                <td className="border border-gray-400 p-2">
                  <button onClick={() => eliminarTurno(turno.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border border-gray-400 p-2 text-center">
                No hay turnos agendados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3 className="text-xl font-bold mt-4">Agendar Nuevo Turno</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="text" name="paciente" placeholder="Nombre del Paciente" value={nuevoTurno.paciente} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="date" name="fecha" value={nuevoTurno.fecha} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="time" name="hora" value={nuevoTurno.hora} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <textarea name="motivo" placeholder="Motivo de la consulta" value={nuevoTurno.motivo} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Agendar Turno</button>
      </form>
    </div>
  );
}