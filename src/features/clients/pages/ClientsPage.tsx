import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '@/api/axiosClient';
import styles from '../../inventory/pages/InventoryPage.module.css';

interface Client {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
}

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar clientes
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await apiClient.get('/client');
        setClients(response.data);
      } catch (error) {
        console.error('Error al cargar clientes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Eliminar cliente
  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás segura de eliminar este cliente?')) return;
    try {
      await apiClient.delete(`/client/delete/${id}`);
      setClients(clients.filter(c => c._id !== id));
      alert('Cliente eliminado');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  };

  if (loading) return <div className={styles.pageContainer}>Cargando clientes...</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <h1>Cartera de Clientes</h1>
        <Link to="/admin/clientes/nuevo" className={styles.addButton}>
          + Nuevo Cliente
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.inventoryTable}>
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Ciudad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td style={{ fontWeight: 'bold' }}>{client.fullName}</td>
                <td>{client.phone}</td>
                <td>{client.email}</td>
                <td>{client.city}</td>
                <td>
                  <button 
                    className={styles.editButton}
                    onClick={() => navigate(`/admin/clientes/editar/${client._id}`)}
                  >
                    Editar
                  </button>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDelete(client._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                  No hay clientes registrados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsPage;