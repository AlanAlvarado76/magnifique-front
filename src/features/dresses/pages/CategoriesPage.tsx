import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoriesPage.module.css';
import { CATEGORIES } from '../categoriesData';

const CategoriesPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.grid}>
        {CATEGORIES.map((cat) => (
          // Al hacer clic, vamos al catálogo filtrando por el nombre de la categoría
          <Link 
            to={`/catalogo?category=${cat.name}`} 
            key={cat.id} 
            className={styles.card}
          >
            {/* Imagen de fondo */}
            <div className={styles.imageWrapper}>
              <img src={cat.image} alt={cat.name} className={styles.image} />
            </div>

            {/* Contenido (Texto sobre la imagen o abajo) */}
            <div className={styles.cardContent}>
              <h2 className={styles.categoryName}>{cat.name}</h2>
              <span className={styles.exploreLink}>Explorar &rarr;</span>
            </div>
            
            {/* Overlay oscuro al pasar el mouse */}
            <div className={styles.overlay}>
              <p className={styles.description}>{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;