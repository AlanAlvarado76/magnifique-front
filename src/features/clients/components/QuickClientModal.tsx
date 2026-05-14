import React, { useState } from 'react';
import apiClient from '@/api/axiosClient';
import { AxiosError } from 'axios';
import styles from '../../inventory/pages/AddEditDressPage.module.css';

interface Client {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;  
}

interface QuickClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newClient: Client) => void;
}

const QuickClientModal: React.FC<QuickClientModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Durango',
    state: 'Durango',
    postalCode: '',
    birthDate: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.post<Client>('/client/create', formData);
      
      alert('¡Cliente registrado rápidamente!');
      onSuccess(response.data); 
      
      onClose();
      setFormData({
        fullName: '', phone: '', email: '', address: '', city: 'Durango', state: 'Durango', postalCode: '', birthDate: ''
      });

    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        alert('Error: ' + (err.response?.data?.message || 'Error de conexión'));
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div className={styles.formContainer} style={{ width: '500px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        
        <button 
          type="button"
          onClick={onClose}
          style={{ position: 'absolute', top: '10px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          &times;
        </button>

        <h2 style={{ textAlign: 'center', marginTop: 0 }}>Nuevo Cliente Rápido</h2>
        
        <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label>Nombre Completo</label>
                <input name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            
            <div className={styles.inputGroup}>
                <label>Fecha Nacimiento (+18)</label>
                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <div className={styles.inputGroup} style={{ flex: 1 }}>
                    <label>Teléfono</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className={styles.inputGroup} style={{ flex: 1 }}>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label>Dirección</label>
                <input name="address" value={formData.address} onChange={handleChange} required />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <div className={styles.inputGroup} style={{ flex: 1 }}>
                    <label>Ciudad</label>
                    <input name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className={styles.inputGroup} style={{ flex: 1 }}>
                   <label>C.P.</label>
                   <input name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                </div>
            </div>
            
            <button type="submit" className={styles.submitButton} style={{ width: '100%', marginTop: '1rem' }}>
                Guardar y Usar
            </button>
        </form>
      </div>
    </div>
  );
};

export default QuickClientModal;