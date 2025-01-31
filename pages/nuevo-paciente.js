// Página de Nuevo Paciente con todos los datos requeridos
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function NuevoPaciente() {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    fecha_nacimiento: '',
    cuidador: '',
    pediatra: '',
    telefono: '',
    motivo_consulta: '',
    historia_clinica: {
      embarazo: '',
      enfermedad_actual: '',
      patologicos: '',
      socioeconomicos: '',
      familiares: '',
      habitos: ''
    },
    peso_talla_historial: [],
    examen_fisico: {
      peso: '',
      talla: '',
      imc: '',
      cc: '',
      pb: '',
      pt: ''
    },
    diagnostico_nutricional: '',
    evaluacion_bioquimica: '',
    evolucion_nutricional: []
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://tuapi.com/pacientes', formData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error al agregar paciente:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Paciente</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="number" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="text" name="cuidador" placeholder="Cuidador" value={formData.cuidador} onChange={handleChange} className="border p-2 mb-2 w-full" />
        <input type="text" name="pediatra" placeholder="Pediatra" value={formData.pediatra} onChange={handleChange} className="border p-2 mb-2 w-full" />
        <input type="tel" name="telefono" placeholder="Teléfono del Cuidador" value={formData.telefono} onChange={handleChange} className="border p-2 mb-2 w-full" />
        
        <textarea name="motivo_consulta" placeholder="Motivo de consulta" value={formData.motivo_consulta} onChange={handleChange} className="border p-2 mb-2 w-full" required />
        
        <h3 className="text-xl font-bold mt-4">Historia Clínica y Nutricional</h3>
        <textarea name="historia_clinica.embarazo" placeholder="Embarazo e historia perinatal" onChange={handleChange} className="border p-2 mb-2 w-full" />
        <textarea name="historia_clinica.enfermedad_actual" placeholder="Antecedentes de enfermedad actual" onChange={handleChange} className="border p-2 mb-2 w-full" />
        <textarea name="historia_clinica.patologicos" placeholder="Antecedentes patológicos" onChange={handleChange} className="border p-2 mb-2 w-full" />
        <textarea name="historia_clinica.socioeconomicos" placeholder="Aspectos socioeconómicos" onChange={handleChange} className="border p-2 mb-2 w-full" />
        <textarea name="historia_clinica.familiares" placeholder="Antecedentes familiares" onChange={handleChange} className="border p-2 mb-2 w-full" />
        <textarea name="historia_clinica.habitos" placeholder="Hábitos del paciente" onChange={handleChange} className="border p-2 mb-2 w-full" />
        
        <h3 className="text-xl font-bold mt-4">Examen Físico</h3>
        <input type="number" name="examen_fisico.peso" placeholder="Peso" onChange={handleChange} className="border p-2 mb-2 w-full" />
        <input type="number" name="examen_fisico.talla" placeholder="Talla" onChange={handleChange} className="border p-2 mb-2 w-full" />
        <input type="number" name="examen_fisico.imc" placeholder="IMC" onChange={handleChange} className="border p-2 mb-2 w-full" />
        
        <h3 className="text-xl font-bold mt-4">Diagnóstico Nutricional</h3>
        <textarea name="diagnostico_nutricional" placeholder="Diagnóstico nutricional" onChange={handleChange} className="border p-2 mb-2 w-full" />
        
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Guardar Paciente</button>
      </form>
    </div>
  );
}
