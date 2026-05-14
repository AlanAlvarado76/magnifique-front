import React from 'react';
import styles from './AboutPage.module.css';
// Puedes usar una de tus imágenes existentes como banner
import heroImage from '../assets/images/v012.png'; 

const AboutPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      
      {/* Sección Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Nuestra Esencia</h1>
          <p>Redefiniendo la elegancia y el consumo responsable.</p>
        </div>
        <div className={styles.heroImageWrapper}>
           <img src={heroImage} alt="Sobre Magnifique" className={styles.heroImage} />
        </div>
      </section>

      {/* Misión y Visión */}
      <section className={styles.missionVisionSection}>
        <div className={styles.card}>
          <h2>Nuestra Misión</h2>
          <p>
            Somos una empresa comprometida a ofrecer a sus clientes productos de alta calidad a precios accesibles, 
            brindando un servicio personalizado que satisfaga las expectativas de cada cliente.
          </p>
        </div>
        <div className={styles.card}>
          <h2>Nuestra Visión</h2>
          <p>
            Ser una empresa líder en el mundo de la moda, proporcionando a las mujeres los elementos necesarios para 
            resaltar su belleza. Asimismo, fomentar un clima laboral positivo para que nuestros colaboradores
             se desarrollen personal y profesionalmente.
          </p>
        </div>
      </section>

      {/* Valores / Por qué elegirnos */}
      <section className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>¿Por qué Magnifique?</h2>
        
        <div className={styles.valuesGrid}>
          <div className={styles.valueItem}>
            <h3>✨ Calidad Premium</h3>
            <p>Seleccionamos cuidadosamente cada pieza asegurando telas y diseños exclusivos.</p>
          </div>
          <div className={styles.valueItem}>
            <h3>🌿 Moda Sostenible</h3>
            <p>Rentar reduce la huella de carbono. Luce increíble mientras cuidas el planeta.</p>
          </div>
          <div className={styles.valueItem}>
            <h3>🧼 Higiene Garantizada</h3>
            <p>Cada vestido pasa por un riguroso proceso de tintorería y esterilización profesional.</p>
          </div>
        </div>
      </section>

      {/* Llamada a la acción final */}
      <section className={styles.ctaSection}>
        <h2>Encuentra tu vestido ideal hoy</h2>
        <p>Ven a visitarnos o explora nuestro catálogo en línea.</p>
      </section>
    </div>
  );
};

export default AboutPage;