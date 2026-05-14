import React, { useEffect, useState } from 'react';
import styles from './PromotionsPage.module.css';
import apiClient from '@/api/axiosClient';

// 👇 1. ELIMINAMOS LA IMPORTACIÓN DE LA IMAGEN POR DEFECTO
// import defaultPromoImage from '@/assets/images/vestido1.png'; 

interface Promotion {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Activa' | 'Inactiva' | 'Finalizada';
  image?: string; // URL que vendrá de Cloudinary
  code?: string; 
}

const PromotionsPage: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await apiClient.get('/promotion');
        // Filtramos solo las activas
        const activePromos = response.data.filter((p: Promotion) => p.status === 'Activa');
        setPromotions(activePromos);
      } catch (error) {
        console.error('Error cargando el blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (loading) {
    return <div className={styles.pageContainer}><p style={{textAlign: 'center'}}>Cargando novedades...</p></div>;
  }

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Journal Magnifique</h1>
        <p className={styles.subtitle}>
          Noticias, ofertas exclusivas y eventos especiales para ti.
        </p>
      </header>

      <div className={styles.blogList}>
        {promotions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
            <p>No hay promociones activas en este momento.</p>
            <p>¡Vuelve pronto para ver nuestras novedades!</p>
          </div>
        ) : (
          promotions.map((promo) => (
            <article key={promo._id} className={styles.blogPost}>
              
              <div className={styles.imageWrapper}>
                {/* 👇 2. USAMOS SOLO LA IMAGEN DEL BACKEND */}
                {promo.image ? (
                  <img 
                    src={promo.image} 
                    alt={promo.title} 
                    className={styles.image} 
                  />
                ) : (
                  // Si no hay imagen, mostramos un fondo gris elegante para no romper el diseño
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: '#f5f5f5', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#ccc',
                    fontFamily: 'Montserrat, sans-serif'
                  }}>
                    Sin Imagen
                  </div>
                )}
                
                <span className={`${styles.badge} ${styles[promo.status.toLowerCase()]}`}>
                  {promo.status}
                </span>
              </div>

              <div className={styles.content}>
                <div className={styles.meta}>
                  <span>Válido hasta: {new Date(promo.endDate).toLocaleDateString()}</span>
                </div>
                
                <h2 className={styles.postTitle}>{promo.title}</h2>
                <p className={styles.description}>{promo.description}</p>
                
                {promo.code && (
                  <div className={styles.couponContainer}>
                    <span>Usa el código:</span>
                    <span className={styles.code}>{promo.code}</span>
                  </div>
                )}
                
                {/* Botón de acción (Opcional, si quieres mantenerlo) */}
                {/* <Link to="/catalogo" className={styles.readMoreBtn}>
                  Ver Vestidos Relacionados &rarr;
                </Link> */}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default PromotionsPage;