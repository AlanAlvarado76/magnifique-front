import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '@/api/axiosClient';
// Usamos los mismos estilos de la tabla de inventario
import styles from "@/features/inventory/pages/InventoryPage.module.css";

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'Admin' | 'User';
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('/user'); 
        setUsers(response.data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás segura de eliminar este usuario?')) return;
    try {
      await apiClient.delete(`/user/delete/${id}`);
      setUsers(users.filter(u => u._id !== id));
      alert('Usuario eliminado correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  };

  if (loading) return <div className={styles.pageContainer}>Cargando usuarios...</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <h1>Gestión de Usuarios</h1>
        <Link to="/admin/usuarios/nuevo" className={styles.addButton}>
          + Nuevo Usuario
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.inventoryTable}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo Electrónico</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ fontWeight: 'bold' }}>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: user.role === 'Admin' ? '#e2e3e5' : '#d1e7dd',
                    color: user.role === 'Admin' ? '#383d41' : '#0f5132',
                    fontWeight: 'bold',
                    fontSize: '0.85rem'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <button 
                    className={styles.editButton}
                    onClick={() => navigate(`/admin/usuarios/editar/${user._id}`)}
                  >
                    Editar
                  </button>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDelete(user._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;