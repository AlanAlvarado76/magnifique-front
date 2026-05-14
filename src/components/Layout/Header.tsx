import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import logoMg from '@/assets/images/Logo-mg.png';

const Header: React.FC = () => {
  const scrollDirection = useScrollDirection();

  return (
    <header 
      className={`${styles.header} ${scrollDirection === 'down' ? styles.hidden : ''}`}
    >
      <div className={styles.topRow}>
        
        <div className={styles.logoContainer}>
          <img src={logoMg} alt="Logo" className={styles.logoImage} />
        </div>

        <div className={styles.logo}>
          <Link to="/">MAGNIFIQUE</Link> 
        </div>

        <div className={styles.spacer}>
          <Link to="/login" className={styles.loginButton}>
            Login
          </Link>
        </div>

      </div>


      <nav className={styles.mainNav}>
        <ul className={styles.navList}>
          <li><Link to="/catalogo" className={styles.navItem}>CATALOGO</Link></li>
          <li><Link to="/categoria" className={styles.navItem}>CATEGORIA</Link></li>
          <li><Link to="/promociones" className={styles.navItem}>PROMOCIONES</Link></li>
          <li><Link to="/nosotros" className={styles.navItem}>NOSOTROS</Link></li>
          <li><Link to="/contacto" className={styles.navItem}>CONTACTO</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;