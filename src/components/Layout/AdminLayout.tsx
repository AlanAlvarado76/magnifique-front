import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import styles from './AdminLayout.module.css';

const AdminLayout: React.FC = () => {
  return (
    <div className={styles.adminContainer}>
      <Sidebar />
      <main className={styles.contentArea}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;