import React from 'react';
import styles from './HomePage.module.css';
import inicioImg from '@/assets/images/inicio.jpg';
import v1Img from '@/assets/images/v1.png';
import v2Img from '@/assets/images/v2.png';
import v3Img from '@/assets/images/v3.png';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Sección 1: Hero Section (Galería de Imágenes) */}
      <img src={inicioImg} alt="Imagen principal"className={styles.heroImage}/>
      

      {/* Sección de introducción o llamados a la acción (puedes añadirla si quieres texto después del hero) */}
      <section className={styles.introductionSection}>
        <h2>Bienvenida al mundo de la elegancia</h2>
        <p>Descubre una colección exclusiva de vestidos para cada momento especial. Renta o adquiere piezas únicas que te harán deslumbrar.</p>
        <button className={styles.ctaButton}>Explorar Colección</button>
      </section>

      {/* Sección 2: Vestidos Destacados (Puedes añadirla aquí) */}
      <section className={styles.featuredSection}>
        <h2>Novedades y Diseños Exclusivos</h2>
        <div className={styles.grid}>
            <img src={v1Img} alt="Imagen vestido1" className={styles.gridItem}/>
            <img src={v2Img} alt="Imagen vestido2" className={styles.gridItem}/>
            <img src={v3Img} alt="Imagen vestido3" className={styles.gridItem}/>
        </div>
      </section>

      {/* Sección 3: Cómo Funciona (Tu sección anterior) */}
      <section className={styles.howItWorksSection}>
        <h2>¿Cómo Funciona el Proceso?</h2>
        <div className={styles.steps}>
            <div className={styles.step}>
                <h3>1. Elige</h3>
                <p>Navega y selecciona el vestido perfecto para ti.</p>
            </div>
            <div className={styles.step}>
                <h3>2. Prueba y Adapta</h3>
                <p>Agenda una cita para probarlo y ajustarlo a tu medida.</p>
            </div>
            <div className={styles.step}>
                <h3>3. Deslumbra</h3>
                <p>Disfruta de tu evento con un vestido de ensueño.</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;