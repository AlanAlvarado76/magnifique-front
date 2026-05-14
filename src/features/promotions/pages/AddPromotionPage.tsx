import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api/axiosClient';
import styles from '../../inventory/pages/AddEditDressPage.module.css'; // Reutilizamos estilos
import { AxiosError } from 'axios';

const AddPromotionPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Estado para los datos de texto
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Activa'
  });

  // 👇 NUEVO: Estado para la imagen
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 👇 NUEVO: Manejar la selección del archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 👇 1. Creamos un FormData para enviar texto + archivo
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('startDate', formData.startDate);
    data.append('endDate', formData.endDate);
    data.append('status', formData.status);

    // 👇 2. Agregamos la imagen si existe (campo 'image')
    if (selectedFile) {
      data.append('image', selectedFile); 
    }

    try {
      // 👇 3. Enviamos con el header correcto
      await apiClient.post('/promotion/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('¡Promoción publicada exitosamente!');
      navigate('/admin/promociones');
    } catch (error) {
      console.error(error);
      interface BackendError { message: string; }
      const err = error as AxiosError<BackendError>;
      const serverMessage = err.response?.data?.message;
      alert('Error: ' + (serverMessage || 'No se pudo conectar con el servidor'));
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1>Publicar Nueva Promoción</h1>

        {/* 👇 NUEVO CAMPO DE IMAGEN */}
        <div className={styles.inputGroup}>
          <label>Imagen de Portada</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            style={{ padding: '10px', border: '1px dashed #ccc', width: '100%', background: 'white' }}
          />
          {selectedFile && (
            <p style={{ fontSize: '0.8rem', color: 'green', marginTop: '5px' }}>
              Archivo seleccionado: {selectedFile.name}
            </p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label>Título del Post</label>
          <input name="title" value={formData.title} onChange={handleChange} required placeholder="Ej: Especial de Graduaciones" />
        </div>

        <div className={styles.inputGroup}>
          <label>Contenido / Descripción</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            rows={6}
            placeholder="Escribe aquí los detalles de la promoción..." 
          />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Fecha Inicio</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label>Fecha Fin</label>
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Estado</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Activa">Activa (Visible)</option>
            <option value="Inactiva">Inactiva (Oculta)</option>
            <option value="Finalizada">Finalizada</option>
          </select>
        </div>

        <div className={styles.buttonRow}>
          <button type="submit" className={styles.submitButton}>Publicar</button>
          <button type="button" className={styles.cancelButton} onClick={() => navigate('/admin/promociones')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddPromotionPage;