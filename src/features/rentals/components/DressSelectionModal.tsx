import React from 'react';
import styles from '../../inventory/pages/AddEditDressPage.module.css'; // Reutilizamos estilos base

// Definimos la forma del vestido que necesitamos aquí
export interface DressSelectionItem {
  _id: string;
  name: string;
  rentalPrice: number;
  images: string[];
}

interface DressSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  dresses: DressSelectionItem[]; // Recibimos la lista de vestidos
  onSelect: (dress: DressSelectionItem) => void;
}

const DressSelectionModal: React.FC<DressSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  dresses, 
  onSelect 
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', // Fondo un poco más oscuro
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      zIndex: 1000
    }}>
      <div className={styles.formContainer} style={{ 
        width: '900px', // Más ancho para que quepan las fotos
        maxWidth: '95vw',
        height: '85vh', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        padding: '2rem'
      }}>
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          style={{ 
            position: 'absolute', top: '15px', right: '20px', 
            background: 'transparent', border: 'none', 
            fontSize: '2rem', cursor: 'pointer', color: '#333' 
          }}
        >
          &times;
        </button>

        <h2 style={{ textAlign: 'center', margin: '0 0 1.5rem 0' }}>
          Selecciona un Vestido Disponible
        </h2>
        
        {/* Área con Scroll para la cuadrícula */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
          
          {dresses.length === 0 ? (
             <p style={{ textAlign: 'center', marginTop: '2rem' }}>No hay vestidos disponibles en este momento.</p>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', // Cuadrícula responsiva
              gap: '1.5rem'
            }}>
              {dresses.map((dress) => (
                <div 
                  key={dress._id} 
                  onClick={() => onSelect(dress)}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    backgroundColor: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Imagen */}
                  <div style={{ height: '220px', width: '100%', backgroundColor: '#f0f0f0' }}>
                    <img 
                      src={dress.images && dress.images.length > 0 ? dress.images[0] : '/placeholder.png'} 
                      alt={dress.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  
                  {/* Info */}
                  <div style={{ padding: '0.8rem', textAlign: 'center' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', color: '#333' }}>
                      {dress.name}
                    </h4>
                    <span style={{ 
                      display: 'inline-block', 
                      backgroundColor: '#e3f2fd', 
                      color: '#0d47a1', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold'
                    }}>
                      ${dress.rentalPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DressSelectionModal;