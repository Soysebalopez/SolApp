// Página de Perfil de la Nutricionista
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Perfil() {
  const [perfil, setPerfil] = useState({
    nombre: '',
    email: '',
    telefono: '',
    notificaciones: false
  });

  useEffect(() => {
    fetchPerfil();
  }, []);

  const fetchPerfil = async () => {
    try {
      const response = await axios.get('/api/perfil'); // Reemplaza con tu API
      setPerfil(response.data);
    } catch (error) {
      console.error('Error al obtener perfil:', error);
    }
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setPerfil({ ...perfil, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/perfil', perfil); // Reemplaza con tu API
      alert('Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Perfil de la Nutricionista</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={perfil.nombre} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="email" name="email" placeholder="Correo Electrónico" value={perfil.email} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="tel" name="telefono" placeholder="Teléfono" value={perfil.telefono} onChange={handleChange} className="border p-2 mb-2 w-full" />

        <label className="flex items-center mt-2">
          <input type="checkbox" name="notificaciones" checked={perfil.notificaciones} onChange={handleChange} className="mr-2" />
          Recibir notificaciones por correo y Google Calendar
        </label>

        <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Guardar Cambios</button>
      </form>

      <h3 className="text-xl font-bold mt-6">Cambiar Contraseña</h3>
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Restablecer Contraseña</button>
    </div>
  );
}