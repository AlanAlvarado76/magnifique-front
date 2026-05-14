import React, { useEffect, useState } from 'react';
import styles from '../../inventory/pages/InventoryPage.module.css'; 
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '@/api/axiosClient';
import { CiCircleCheck, CiTrash, CiEdit, CiCircleRemove } from "react-icons/ci";
import DamageReportModal from '../components/DamageReportModal';

// 👇 1. Definimos la estructura de los datos del reporte
interface DamageReportData {
  repairCost: number;
  replacementCost: number;
  damageNotes: string;
}

interface Rental {
  _id: string;
  clientName: string;
  dress: {
    name: string;
    rentalPrice: number;
  };
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  totalPrice: number;
}

const RentalsPage: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isDamageModalOpen, setIsDamageModalOpen] = useState(false);
  const [selectedRentalId, setSelectedRentalId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await apiClient.get('/rental');
        setRentals(response.data);
      } catch (error) {
        console.error('Error al cargar rentas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    return `${day}/${month}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
        case 'active': 
            return { bg: '#fff3cd', color: '#856404', text: 'En Curso' };
        case 'completed': 
            return { bg: '#d4edda', color: '#155724', text: 'Devuelto' };
        case 'cancelled': 
            return { bg: '#f8d7da', color: '#721c24', text: 'Cancelada' };
        default: 
            return { bg: '#e2e3e5', color: '#383d41', text: status };
    }
  };

  // --- Manejadores de Acción ---

  const handleComplete = async (id: string) => {
    if (!window.confirm('¿Confirmar devolución del vestido?')) return;
    try {
      await apiClient.put(`/rental/update/${id}`, { status: 'completed' });
      
      setRentals(rentals.map(r => 
        r._id === id ? { ...r, status: 'completed' } : r
      ));
      alert('Renta finalizada. El vestido vuelve a estar disponible.');
    } catch (error) {
      console.error(error);
      alert('Error al finalizar la renta');
    }
  };

  const handleCancel = async (id: string) => {
    if (!window.confirm('¿Estás segura de CANCELAR esta renta? El vestido se liberará inmediatamente.')) return;
    try {
      await apiClient.put(`/rental/update/${id}`, { status: 'cancelled' });
      
      setRentals(rentals.map(r => 
        r._id === id ? { ...r, status: 'cancelled' } : r
      ));
      alert('Renta cancelada.');
    } catch (error) {
      console.error(error);
      alert('Error al cancelar');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar registro permanentemente?')) return;
    try {
      await apiClient.delete(`/rental/delete/${id}`);
      setRentals(rentals.filter(r => r._id !== id));
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  };

  // 👇 2. Usamos la interfaz aquí en lugar de 'any'
  const handleReportDamage = async (data: DamageReportData) => {
    if (!selectedRentalId) return;
    try {
      await apiClient.put(`/rental/damage/${selectedRentalId}`, data);
      alert('Daño reportado correctamente.');
      
      // Recargar rentas para ver el cambio de estado
      const res = await apiClient.get('/rental');
      setRentals(res.data);
    } catch (error) {
      console.error(error);
      alert('Error al reportar daño');
    }
  };

  if (loading) return <div className={styles.pageContainer}>Cargando historial...</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <h1>Historial de Rentas</h1>
        <Link to="/admin/rentas/nueva" className={styles.addButton}>
          + Nueva Renta
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.inventoryTable}>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Vestido</th>
              <th>Periodo</th>
              <th>Estado</th>
              <th>Total</th>
              <th style={{ textAlign: 'right', paddingRight: '1rem' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => {
              const badge = getStatusBadge(rental.status);
              
              return (
                <tr key={rental._id}>
                  <td style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                    {rental.clientName}
                  </td>
                  <td>{rental.dress?.name || 'Vestido eliminado'}</td>
                  
                  <td className={styles.dateCell}>
                    {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                  </td>

                  <td>
                    <span style={{
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      backgroundColor: badge.bg,
                      color: badge.color
                    }}>
                      {badge.text}
                    </span>
                  </td>

                  <td style={{ fontWeight: '500' }}>${rental.totalPrice}</td>
                  
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
                      
                      {rental.status === 'active' && (
                        <>
                          <button 
                            className={`${styles.iconButton} ${styles.btnComplete}`}
                            onClick={() => handleComplete(rental._id)}
                            title="Marcar como Devuelto"
                          >
                            <CiCircleCheck />
                          </button>

                          <button 
                            className={`${styles.iconButton} ${styles.btnCancel}`}
                            onClick={() => handleCancel(rental._id)}
                            title="Cancelar Renta"
                          >
                            <CiCircleRemove />
                          </button>
                          
                          <span style={{ borderLeft: '1px solid #ddd', height: '20px', margin: '0 4px' }}></span>
                        </>
                      )}

                      <button 
                        className={`${styles.iconButton} ${styles.btnEdit}`}
                        onClick={() => navigate(`/admin/rentas/editar/${rental._id}`)}
                        title="Editar"
                      >
                        <CiEdit />
                      </button>

                      <button 
                        className={`${styles.iconButton} ${styles.btnDelete}`}
                        onClick={() => handleDelete(rental._id)}
                        title="Eliminar Registro"
                      >
                        <CiTrash /> 
                      </button>
                      
                      {/* Botón de reporte de daño */}
                      <button 
                        className={styles.iconButton}
                        style={{ color: '#dc3545' }}
                        onClick={() => { setSelectedRentalId(rental._id); setIsDamageModalOpen(true); }}
                        title="Reportar Daño"
                      >
                        ⚠️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {rentals.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                  No hay rentas registradas aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <DamageReportModal 
        isOpen={isDamageModalOpen}
        onClose={() => setIsDamageModalOpen(false)}
        onSubmit={handleReportDamage}
    />
    </div>
  );
};

export default RentalsPage;