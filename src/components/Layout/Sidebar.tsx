import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
        <h2>MAGNIFIQUE</h2>
        <span>Panel Admin</span>
      </div>

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link 
              to="/admin" 
              className={isActive('/admin') ? styles.active : ''}
            >
              🏠 Inicio
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/inventario" 
              className={isActive('/admin/inventario') ? styles.active : ''}
            >
              📦 Inventario
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/agregar-vestido" 
              className={isActive('/admin/agregar-vestido') ? styles.active : ''}
            >
              ➕ Nuevo Vestido
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/promociones" 
              className={isActive('/admin/promociones') ? styles.active : ''}
            >
              📢 Promociones
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/clientes" 
              className={isActive('/admin/clientes') ? styles.active : ''}
            >
              👥 Clientes
            </Link>
         </li> 
          <li>
            <Link 
              to="/admin/rentas" 
              className={isActive('/admin/rentas') ? styles.active : ''}
            >
              🛍 Renta
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/rentas/nueva" 
              className={isActive('/admin/rentas/nueva') ? styles.active : ''}
            >
              📅 Nueva Renta
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/usuarios" 
              className={isActive('/admin/usuarios') ? styles.active : ''}
            >
              👤 Usuarios
            </Link>
          </li>

        </ul>
      </nav>

      <div className={styles.footer}>
        <button onClick={logout} className={styles.logoutBtn}>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;