// Página para agregar un nuevo paciente
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function NuevoPaciente() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    fecha_nacimiento: '',
    cuidador: '',
    pediatra: '',
    telefono: '',
    motivo_consulta: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // PREVIENE QUE LA PÁGINA SE RECARGUE
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://tuapi.com/pacientes', formData); // REEMPLAZA CON TU API
      console.log('Paciente agregado:', response.data);
      router.push('/pacientes'); // REDIRECCIÓN A LISTA DE PACIENTES
    } catch (error) {
      console.error('Error al agregar paciente:', error);
      setError('Hubo un error al guardar el paciente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Paciente</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="number" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="text" name="cuidador" placeholder="Cuidador" value={formData.cuidador} onChange={handleChange} className="border p-2 mb-2 w-full" />
        <input type="text" name="pediatra" placeholder="Pediatra" value={formData.pediatra} onChange={handleChange} className="border p-2 mb-2 w-full" />
        <input type="tel" name="telefono" placeholder="Teléfono del Cuidador" value={formData.telefono} onChange={handleChange} className="border p-2 mb-2 w-full" />
        <textarea name="motivo_consulta" placeholder="Motivo de consulta" value={formData.motivo_consulta} onChange={handleChange} className="border p-2 mb-2 w-full" required />

        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded w-full" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Paciente'}
        </button>
      </form>
    </div>
  );
}