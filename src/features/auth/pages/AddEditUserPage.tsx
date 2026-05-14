import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '@/api/axiosClient';
import { AxiosError } from 'axios';
import styles from '../auth/pages/LoginPage.module.css';

interface UserFormData {
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
}

interface ErrorResponse {
  message: string;
}

const AddEditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: '',
    password: '',
    role: 'User',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        try {
          // Tipamos la respuesta esperada
          const response = await apiClient.get<UserFormData>(`/user/${id}`);
          const { username, email, role } = response.data;
          // Reiniciamos password a vacío para no mostrar el hash
          setFormData({ username, email, role, password: '' });
        } catch (err) {
          console.error(err);
          setError('Error al cargar los datos del usuario.');
        }
      };
      fetchUser();
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditMode) {
        // Lógica sin 'any': Separamos la password del resto de datos
        const { password, ...rest } = formData;
        
        // Si hay contraseña escrita, la incluimos; si no, enviamos solo el resto
        const dataToSend = password ? formData : rest;

        await apiClient.put(`/user/update/${id}`, dataToSend);
        alert('Usuario actualizado correctamente');
      } else {
        // En creación enviamos todo
        await apiClient.post('/user/create', formData);
        alert('Usuario creado correctamente');
      }
      navigate('/admin/usuarios');
    } catch (err) {
      // Lógica sin 'any': Usamos el tipo AxiosError
      const axiosError = err as AxiosError<ErrorResponse>;
      const message = axiosError.response?.data?.message || 'Ocurrió un error al guardar.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer} style={{ padding: '2rem' }}>
      <div className={styles.loginContainer} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <h1>{isEditMode ? 'Editar Usuario' : 'Nuevo Usuario'}</h1>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.inputGroup}>
            <label>Nombre de Usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Contraseña {isEditMode && <span style={{fontSize: '0.8em', color: '#666'}}>(Dejar en blanco para mantener la actual)</span>}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!isEditMode} // Obligatoria solo al crear
              minLength={6}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Rol</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
            >
              <option value="User">Usuario (Vendedor)</option>
              <option value="Admin">Administrador</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button 
              type="button" 
              onClick={() => navigate('/admin/usuarios')}
              className={styles.loginButton}
              style={{ backgroundColor: '#6c757d' }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear Usuario')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditUserPage;