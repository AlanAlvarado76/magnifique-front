import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import styles from './DressDetailPage.module.css';
import "react-image-gallery/styles/css/image-gallery.css";
import apiClient from '@/api/axiosClient'; // 👈 Importamos la conexión

// Definimos la forma del vestido
interface Dress {
  _id: string;
  name: string;
  description?: string;
  rentalPrice: number;
  salePrice?: number;
  images: string[];
}

const DressDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 👇 Estados para guardar el vestido real y la carga
  const [dress, setDress] = useState<Dress | null>(null);
  const [loading, setLoading] = useState(true);

  // 👇 EFECTO: Pedir el vestido al Backend
  useEffect(() => {
    const fetchDressDetail = async () => {
      try {
        // Petición GET a tu API usando el ID de la URL
        const response = await apiClient.get(`/dress/${id}`);
        setDress(response.data);
      } catch (error) {
        console.error('Error al cargar el detalle del vestido:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDressDetail();
    }
  }, [id]);

  // --- RENDERIZADO DE BOTONES DEL CARRUSEL ---
  const renderLeftNav = (onClick: React.MouseEventHandler<HTMLElement>, disabled: boolean) => (
    <button
      className={`${styles.navBtn} ${styles.navBtnLeft}`}
      disabled={disabled}
      onClick={onClick}
    >
      &#10094;
    </button>
  );

  const renderRightNav = (onClick: React.MouseEventHandler<HTMLElement>, disabled: boolean) => (
    <button
      className={`${styles.navBtn} ${styles.navBtnRight}`}
      disabled={disabled}
      onClick={onClick}
    >
      &#10095;
    </button>
  );

  if (loading) {
    return <div className={styles.container}><p style={{textAlign: 'center', marginTop: '4rem'}}>Cargando detalles...</p></div>;
  }

  if (!dress) {
    return <div className={styles.container}><p style={{textAlign: 'center', marginTop: '4rem'}}>Vestido no encontrado.</p></div>;
  }

  // Preparar imágenes para la galería
  // Si el vestido no tiene imágenes, ponemos un placeholder
  const galleryImages = dress.images && dress.images.length > 0 
    ? dress.images.map(img => ({ original: img, thumbnail: img })) 
    : [{ original: 'https://via.placeholder.com/400', thumbnail: 'https://via.placeholder.com/100' }];

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        &#8592; Volver
      </button>

      <div className={styles.layout}>
        <div className={styles.galleryWrapper}>
          <ImageGallery
            items={galleryImages}
            showPlayButton={false}
            showFullscreenButton={true}
            thumbnailPosition="bottom"
            renderLeftNav={renderLeftNav}
            renderRightNav={renderRightNav}
          />
        </div>

        <div className={styles.detailsWrapper}>
          <h1 className={styles.name}>{dress.name}</h1>
          <p className={styles.price}>Renta: ${dress.rentalPrice} MXN</p>
          {dress.salePrice && dress.salePrice > 0 && (
            <p className={styles.price} style={{ fontSize: '1rem', color: '#666' }}>
              Venta: ${dress.salePrice} MXN
            </p>
          )}
          
          {/* <h2 className={styles.detailsTitle}>Descripción</h2>
          <p className={styles.description}>
            {dress.description || "Este vestido no tiene una descripción detallada aún."}
          </p> */}
          
          
        </div>
      </div>
    </div>
  );
};

export default DressDetailPage;