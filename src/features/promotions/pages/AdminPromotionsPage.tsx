import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '@/api/axiosClient';
// Usamos los mismos estilos del inventario, asegúrate de agregar el CSS del paso 2 ahí
import styles from '../../inventory/pages/InventoryPage.module.css';

interface Promotion {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: 'Activa' | 'Inactiva' | 'Finalizada';
}

const AdminPromotionsPage: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos al inicio
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await apiClient.get('/promotion');
        setPromotions(response.data);
      } catch (error) {
        console.error('Error al cargar promociones:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  // 👇 NUEVA FUNCIÓN: Cambiar estado con el Switch
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    // Si está Activa pasa a Inactiva, si no, se activa
    const newStatus = currentStatus === 'Activa' ? 'Inactiva' : 'Activa';
    
    // 1. Actualización optimista (cambia la UI inmediatamente para que se sienta rápido)
    const previousPromotions = [...promotions];
    setPromotions(promotions.map(p => 
      p._id === id ? { ...p, status: newStatus } : p
    ));

    try {
      // 2. Petición al backend para guardar el cambio
      await apiClient.put(`/promotion/update/${id}`, { status: newStatus });
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      // Si falla, revertimos el cambio visual
      setPromotions(previousPromotions);
      alert('No se pudo cambiar el estado');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Borrar esta promoción permanentemente?')) return;
    try {
      await apiClient.delete(`/promotion/delete/${id}`);
      setPromotions(promotions.filter(p => p._id !== id));
      alert('Promoción eliminada');
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar');
    }
  };

  if (loading) return <div className={styles.pageContainer}>Cargando promociones...</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <h1>Gestión de Promociones</h1>
        <Link to="/admin/promociones/nueva" className={styles.addButton}>
          + Nueva Promo
        </Link>
      </div>

      <table className={styles.inventoryTable}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Vigencia</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promo) => (
            <tr key={promo._id}>
              <td style={{ fontWeight: 'bold' }}>{promo.title}</td>
              <td>
                {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}
              </td>
              
              {/* 👇 CAMBIO AQUÍ: La columna de Estado ahora tiene el Switch */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* El Switch */}
                  <label className={styles.switch}>
                    <input 
                      type="checkbox" 
                      checked={promo.status === 'Activa'}
                      onChange={() => handleToggleStatus(promo._id, promo.status)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                  
                  {/* Texto del estado */}
                  <span style={{ 
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: promo.status === 'Activa' ? '#28a745' : '#6c757d'
                  }}>
                    {promo.status}
                  </span>
                </div>
              </td>

              <td>
                <button 
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => handleDelete(promo._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPromotionsPage;