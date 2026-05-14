import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '@/api/axiosClient';
import { AxiosError } from 'axios';
import styles from '../../inventory/pages/AddEditDressPage.module.css';

const AddEditClientPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Durango', 
    state: 'Durango',
    postalCode: '',
    birthDate:''
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchClient = async () => {
        try {
          const response = await apiClient.get(`/client/${id}`);
          const data = response.data;

          if (data.birthDate) {
            data.birthDate = data.birthDate.split('T')[0];
          }

          setFormData(data);
        } catch (error) {
          console.error('Error al cargar cliente', error);
          alert('No se pudo cargar el cliente');
          navigate('/admin/clientes');
        }
      };
      fetchClient();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await apiClient.put(`/client/update/${id}`, formData);
        alert('¡Cliente actualizado!');
      } else {
        await apiClient.post('/client/create', formData);
        alert('¡Cliente registrado!');
      }
      navigate('/admin/clientes');
    } catch (error) {
      console.error(error);
      const err = error as AxiosError<{ message: string }>;
      alert('Error: ' + (err.response?.data?.message || 'Error de conexión'));
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1>{isEditMode ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}</h1>

        <div className={styles.inputGroup}>
          <label>Nombre Completo</label>
          <input name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>

        <div className={styles.inputGroup}>
          <label>Fecha de Nacimiento</label>
          <input type='date' name='birthDate' value={formData.birthDate} onChange={handleChange} required />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Teléfono (10 dígitos)</label>
            <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="618..." />
          </div>
          <div className={styles.inputGroup}>
            <label>Correo Electrónico</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Dirección (Calle y número)</label>
          <input name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Ciudad</label>
            <input name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label>Estado</label>
            <input name="state" value={formData.state} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label>Código Postal</label>
            <input name="postalCode" value={formData.postalCode} onChange={handleChange} required />
          </div>
        </div>

        <div className={styles.buttonRow}>
          <button type="submit" className={styles.submitButton}>Guardar</button>
          <button type="button" className={styles.cancelButton} onClick={() => navigate('/admin/clientes')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddEditClientPage;