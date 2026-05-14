import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminDashboardPage.module.css';

const AdminDashboardPage: React.FC = () => {
  
  // Aquí definimos las opciones que tienes en tu Sidebar
  const adminOptions = [
    { 
      title: 'Inventario', 
      path: '/admin/inventario', 
      icon: '📦', 
      desc: 'Gestiona, edita y elimina vestidos del catálogo.' 
    },
    { 
      title: 'Nuevo Vestido', 
      path: '/admin/agregar-vestido', 
      icon: '➕', 
      desc: 'Registra una nueva prenda en la base de datos.' 
    },
    { 
      title: 'Promociones', 
      path: '/admin/promociones', 
      icon: '📢', 
      desc: 'Administra las ofertas y noticias del blog.' 
    },
    { 
      title: 'Clientes', 
      path: '/admin/clientes', 
      icon: '👥', 
      desc: 'Consulta y edita la cartera de clientas.' 
    },
    { 
      title: 'Rentas', 
      path: '/admin/rentas', 
      icon: '🛍', 
      desc: 'Historial de rentas, fechas y devoluciones.' 
    },
    { 
      title: 'Nueva Renta', 
      path: '/admin/rentas/nueva', 
      icon: '📅', 
      desc: 'Registra una renta para una clienta existente.' 
    },
    { 
      title: 'Usuarios', 
      path: '/admin/usuarios', 
      icon: '👤', 
      desc: 'Gestiona el acceso de administradores y staff.' 
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Panel de Administración</h1>
        <p>Bienvenida de nuevo. </p>
      </header>

      <div className={styles.grid}>
        {adminOptions.map((option, index) => (
          <Link to={option.path} key={index} className={styles.card}>
            <div className={styles.icon}>{option.icon}</div>
            <div className={styles.content}>
              <h3>{option.title}</h3>
              <p>{option.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;