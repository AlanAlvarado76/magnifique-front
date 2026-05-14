import React from 'react';
import type { Dress } from '@/features/dresses/types/Dress';
import styles from './DressCard.module.css';
import { Link } from 'react-router-dom';

interface DressCardProps {
  dress: Dress;
}

const DressCard: React.FC<DressCardProps> = ({ dress }) => {
  return (
    <div className={styles.card}>
      <img 
        src={dress.images && dress.images.length > 0 ? dress.images[0] : '/placeholder.png'} 
        alt={dress.name} 
        className={styles.image} 
      />
      <div className={styles.content}>
        <h3 className={styles.name}>{dress.name}</h3>
        <p className={styles.price}>Renta: ${dress.rentalPrice} MXN</p>
        
        <Link to={`/vestido/${dress._id}`} className={styles.button}>
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default DressCard;