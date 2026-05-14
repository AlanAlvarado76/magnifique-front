import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { useAuth } from '../../../hooks/useAuth';
import apiClient from '@/api/axiosClient';
import { AxiosError } from 'axios';

interface LoginResponse {
  token: string;
  user: {
    id: string; // CORREGIDO: El backend envía 'id', no '_id'
    username: string;
    email?: string; // El backend a veces no devuelve email en el objeto filtrado según tu controller
    role: string;
  };
}

const LoginPage: React.FC = () => {
  // CORREGIDO: Cambiado nombre de estado a identifier para mayor claridad
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // CORREGIDO: Enviamos 'identifier' en lugar de 'email' para coincidir con el backend
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        identifier, 
        password,
      });

      const { token, user } = response.data;

      const mappedUser = {
        id: user.id, // CORREGIDO: Usamos user.id
        username: user.username,
        role: user.role as 'Admin' | 'User',
      };

      login(token, mappedUser);
      navigate('/admin');
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;

      if (axiosError.response?.status === 401) {
        setError('Credenciales incorrectas');
      } else if (axiosError.response?.status === 404) {
        setError('Usuario no encontrado'); // Manejo adicional para 404
      } else if (axiosError.response?.data?.message) {
        setError(axiosError.response.data.message);
      } else {
        setError('Error al conectar con el servidor');
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.inputGroup}>
            {/* CORREGIDO: Label más descriptivo */}
            <label>Email o Usuario</label>
            <input
              type="text" /* CORREGIDO: 'text' permite username o email. 'email' forzaba formato @ */
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              placeholder="ejemplo@correo.com o usuario123"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;