// Página de integración con Google Calendar para gestionar turnos
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GoogleCalendarTurnos() {
  const [turnos, setTurnos] = useState([]);
  const [nuevoTurno, setNuevoTurno] = useState({
    paciente: '',
    fecha: '',
    hora: '',
    motivo: ''
  });

  useEffect(() => {
    fetchTurnosGoogleCalendar();
  }, []);

  const fetchTurnosGoogleCalendar = async () => {
    try {
      const response = await axios.get('/api/google-calendar/turnos'); // Endpoint en tu API para obtener los turnos de Google Calendar
      setTurnos(response.data);
    } catch (error) {
      console.error('Error al obtener turnos de Google Calendar:', error);
    }
  };

  const handleChange = (e) => {
    setNuevoTurno({ ...nuevoTurno, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/google-calendar/agendar', nuevoTurno); // Endpoint en tu API para agregar un turno a Google Calendar
      setNuevoTurno({ paciente: '', fecha: '', hora: '', motivo: '' });
      fetchTurnosGoogleCalendar();
    } catch (error) {
      console.error('Error al agendar turno en Google Calendar:', error);
    }
  };

  const eliminarTurno = async (id) => {
    try {
      await axios.delete(`/api/google-calendar/eliminar/${id}`); // Endpoint en tu API para eliminar un turno de Google Calendar
      fetchTurnosGoogleCalendar();
    } catch (error) {
      console.error('Error al eliminar turno de Google Calendar:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestión de Turnos en Google Calendar</h2>

      <h3 className="text-xl font-bold mt-4">Turnos Sincronizados</h3>
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
                No hay turnos sincronizados con Google Calendar.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3 className="text-xl font-bold mt-4">Agendar Nuevo Turno en Google Calendar</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="text" name="paciente" placeholder="Nombre del Paciente" value={nuevoTurno.paciente} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="date" name="fecha" value={nuevoTurno.fecha} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="time" name="hora" value={nuevoTurno.hora} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <textarea name="motivo" placeholder="Motivo de la consulta" value={nuevoTurno.motivo} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Agregar a Google Calendar</button>
      </form>
    </div>
  );
}