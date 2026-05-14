import React, { useEffect, useState } from 'react';
import styles from './InventoryPage.module.css';
// 👇 CORRECCIÓN: Una sola línea de importación para react-router-dom
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '@/api/axiosClient';

// Definimos la forma de los datos
interface Dress {
  _id: string;
  name: string;
  rentalPrice: number;
  images: string[];
  status: 'Nuevo' | 'Usado'; // 👈 Campo de estado
}

const InventoryPage: React.FC = () => {
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 👈 Hook para navegar

  // 1. Cargar inventario desde el backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await apiClient.get('/dress'); 
        setDresses(response.data);
      } catch (error) {
        console.error('Error cargando inventario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // 2. Función para eliminar vestido
  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás segura de que quieres eliminar este vestido permanentemente?')) return;

    try {
      await apiClient.delete(`/dress/delete/${id}`);
      // Actualizar la lista visualmente quitando el eliminado
      setDresses(dresses.filter(dress => dress._id !== id));
      alert('Vestido eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('No se pudo eliminar el vestido.');
    }
  };

  if (loading) return <div className={styles.pageContainer}>Cargando inventario...</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <h1>Inventario de Vestidos</h1>
        <Link to="/admin/agregar-vestido" className={styles.addButton}>
          + Agregar Nuevo Vestido
        </Link>
      </div>

      {dresses.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No hay vestidos registrados aún.</p>
          <p>¡Agrega el primero usando el botón verde!</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.inventoryTable}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio Renta</th>
                <th>Estado</th> {/* 👈 Columna de Estado */}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dresses.map((dress) => (
                <tr key={dress._id}>
                  <td>
                    {/* Imagen del vestido */}
                    <img 
                      src={dress.images && dress.images.length > 0 ? dress.images[0] : 'https://via.placeholder.com/100'} 
                      alt={dress.name} 
                      className={styles.thumbnail} 
                    />
                  </td>
                  <td className={styles.nameCell}>{dress.name}</td>
                  <td>${dress.rentalPrice}</td>
                  
                  {/* Etiqueta de Estado */}
                  <td>
                    <span className={`${styles.statusBadge} ${dress.status === 'Nuevo' ? styles.statusNew : styles.statusUsed}`}>
                      {dress.status}
                    </span>
                  </td>

                  <td>
                    {/* Botón Editar */}
                    <button 
                      className={styles.editButton}
                      onClick={() => navigate(`/admin/editar-vestido/${dress._id}`)}
                    >
                      Editar
                    </button>
                    
                    {/* Botón Eliminar */}
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDelete(dress._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;