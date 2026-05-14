import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '@/api/axiosClient';
import styles from '../../inventory/pages/AddEditDressPage.module.css';
import { AxiosError } from 'axios';
import QuickClientModal from '@/features/clients/components/QuickClientModal';
import DressSelectionModal, { type DressSelectionItem } from '../components/DressSelectionModal';

// Interfaces actualizadas
interface Client {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

interface Dress extends DressSelectionItem {
  sizes: { size: string; available: boolean }[];
}

const AddRentalPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEditMode = !!id;

  const [clients, setClients] = useState<Client[]>([]);
  const [dresses, setDresses] = useState<Dress[]>([]);

  // Campos del formulario
  const [clientId, setClientId] = useState('');
  const [dressId, setDressId] = useState('');
  const [rentedSize, setRentedSize] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Modales
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isDressModalOpen, setIsDressModalOpen] = useState(false);

  // Objetos seleccionados
  const selectedClient = clients.find(c => c._id === clientId);
  const selectedDress = dresses.find(d => d._id === dressId);

  // Cargar datos iniciales
  useEffect(() => {
    const loadRentalForEdit = async (rentalId: string) => {
        try {
            const res = await apiClient.get(`/rental/${rentalId}`);
            const r = res.data;
            setClientId(typeof r.clientId === 'object' ? r.clientId._id : r.clientId);
            setDressId(typeof r.dress === 'object' ? r.dress._id : r.dress);
            
            if (r.rentedSize) setRentedSize(r.rentedSize);
            if (r.startDate) setStartDate(r.startDate.split('T')[0]);
            if (r.endDate) setEndDate(r.endDate.split('T')[0]);
        } catch (e) { console.error(e); }
    };

    const fetchCatalogs = async () => {
      try {
        const [resClients, resDresses] = await Promise.all([
          apiClient.get('/client'),
          apiClient.get('/dress')
        ]);
        setClients(resClients.data);
        setDresses(resDresses.data);

        if (id) await loadRentalForEdit(id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCatalogs();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        clientId,
        dress: dressId,
        rentedSize,
        startDate,
        endDate
      };

      if (isEditMode) {
        await apiClient.put(`/rental/update/${id}`, payload);
        alert('¡Renta actualizada!');
      } else {
        await apiClient.post('/rental/create', payload);
        alert('¡Renta registrada con éxito!');
      }
      navigate('/admin/rentas');
    } catch (error) {
      console.error(error);
      const err = error as AxiosError<{message: string}>;
      alert('Error: ' + (err.response?.data?.message || 'Error al guardar renta'));
    }
  };

  const handleDressSelected = (dress: DressSelectionItem) => {
    setDressId(dress._id);
    setRentedSize('');
    setIsDressModalOpen(false);
  };

  const handleClientCreated = (newClient: Client) => {
    setClients([...clients, newClient]);
    setClientId(newClient._id);
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1>{isEditMode ? 'Editar Renta' : 'Registrar Nueva Renta'}</h1>
        
        {/* Botón Nuevo Cliente */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button type="button" className={styles.addButton} onClick={() => setIsClientModalOpen(true)}>
            + Nuevo Cliente Rápido
          </button>
        </div>

        {/* Selección de Cliente */}
        <div className={styles.inputGroup}>
          <label>Seleccionar Clienta</label>
          <select value={clientId} onChange={e => setClientId(e.target.value)} required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="">-- Busca una clienta --</option>
            {clients.map(client => (
              <option key={client._id} value={client._id}>{client.fullName}</option>
            ))}
          </select>
        </div>

        {/* 👇 AQUÍ FALTABA ESTO: Tarjeta de Información de la Clienta */}
        {selectedClient && (
          <div style={{
            backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', 
            border: '1px solid #e9ecef', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#555'
          }}>
            <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
              Datos de contacto:
            </strong>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <span> {selectedClient.email}</span>
              <span> {selectedClient.phone}</span>
              <span style={{ gridColumn: 'span 2' }}> {selectedClient.address}, {selectedClient.city}</span>
            </div>
          </div>
        )}

        {/* --- SECCIÓN VESTIDO Y TALLA --- */}
        <div className={styles.inputGroup}>
          <label>Seleccionar Vestido</label>
          
          {!selectedDress ? (
            <button 
              type="button"
              onClick={() => setIsDressModalOpen(true)}
              style={{ width: '100%', padding: '2rem', border: '2px dashed #ccc', borderRadius: '8px', backgroundColor: '#fafafa', cursor: 'pointer', color: '#666' }}
            >
              👗 Haz click aquí para ver la Galería
            </button>
          ) : (
            <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
              
              {/* Info del Vestido */}
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1rem' }}>
                <img src={selectedDress.images[0] || '/placeholder.png'} alt={selectedDress.name} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>{selectedDress.name}</h3>
                  <p style={{ margin: 0, color: '#28a745', fontWeight: 'bold' }}>${selectedDress.rentalPrice}</p>
                </div>
                <button type="button" onClick={() => setIsDressModalOpen(true)} className={styles.editButton}>Cambiar</button>
              </div>

              {/* Selector de Talla */}
              <div className={styles.inputGroup} style={{ marginBottom: 0 }}>
                <label style={{ color: '#007bff' }}>Selecciona la Talla a Rentar:</label>
                <select 
                    value={rentedSize} 
                    onChange={(e) => setRentedSize(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '2px solid #007bff', backgroundColor: '#f0f8ff' }}
                >
                    <option value="">-- Elige Talla --</option>
                    {selectedDress.sizes && selectedDress.sizes.map((s, idx) => (
                        <option 
                            key={idx} 
                            value={s.size} 
                            disabled={!s.available && s.size !== rentedSize}
                        >
                            {s.size} {s.available ? '(Disponible)' : '(Ocupado)'}
                        </option>
                    ))}
                </select>
              </div>

            </div>
          )}
          
          {/* Input oculto de validación */}
          <input type="text" value={dressId} onChange={() => {}} required style={{ opacity: 0, height: 0, position: 'absolute' }} onInvalid={e => e.currentTarget.setCustomValidity('Selecciona un vestido')} />
        </div>

        {/* Fechas */}
        <div className={styles.row}>
            <div className={styles.inputGroup}>
            <label>Fecha Entrega</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            </div>
            <div className={styles.inputGroup}>
            <label>Fecha Devolución</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
            </div>
        </div>

        <div className={styles.buttonRow}>
          <button type="submit" className={styles.submitButton}>{isEditMode ? 'Actualizar' : 'Registrar'}</button>
          <button type="button" className={styles.cancelButton} onClick={() => navigate('/admin/rentas')}>Cancelar</button>
        </div>
      </form>

      <QuickClientModal isOpen={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} onSuccess={handleClientCreated} />
      
      <DressSelectionModal
        isOpen={isDressModalOpen}
        onClose={() => setIsDressModalOpen(false)}
        dresses={dresses} 
        onSelect={handleDressSelected}
      />
    </div>
  );
};

export default AddRentalPage;