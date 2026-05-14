// src/features/dresses/mockData.ts
import type { Dress } from '@/features/dresses/types/Dress';

// --- 1. IMPORTA TUS IMÁGENES CON LA EXTENSIÓN .png ---
// ../../ sube dos niveles (de 'dresses' a 'features', y de 'features' a 'src')
import vestido1 from '../../assets/images/vestido1.png'; // 👈 CAMBIO: .png
import vestido2 from '../../assets/images/vestido2.png'; // 👈 CAMBIO: .png
import vestido3 from '../../assets/images/vestido3.png'; // 👈 CAMBIO: .png
import v08 from '../../assets/images/v08.png';       // 👈 CAMBIO: .png
import v012 from '../../assets/images/v012.png'; 
import v013 from '../../assets/images/v013.png'; 
import v023 from '../../assets/images/v023.jpg'; 
import v026 from '../../assets/images/v026.jpg'; 
import v3 from '../../assets/images/v3.png'; 
import v008 from '../../assets/images/v008.png'; 


// --- 2. USA LAS VARIABLES (esto ya estaba bien) ---
export const MOCK_DRESSES: Dress[] = [
  {
    _id: '1',
    name: 'Vino con detallado de perlas',
    description: 'Elegante vestido de noche color negro, corte sirena.',
    rentalPrice: 1500,
    salePrice: 4500,
    images: [vestido1],
    sizes: [{ size: 'M', available: true }],
  },
  {
    _id: '2',
    name: 'Vestido Lila',
    description: 'Ligero vestido de coctel color pastel, ideal para jardín.',
    rentalPrice: 1200,
    images: [vestido2],
    sizes: [{ size: 'M', available: true }],
  },
  {
    _id: '3',
    name: 'Vestido Verde menta',
    description: 'Vestido largo color rojo rubí con espalda descubierta.',
    rentalPrice: 1800,
    salePrice: 5000,
    images: [vestido3],
    sizes: [{ size: 'M', available: true }],
  },
  {
    _id: '4',
    name: 'Vestido Vino',
    description: 'Vestido corto y fresco para graduación.',
    rentalPrice: 900,
    images: [v3],
    sizes: [{ size: 'M', available: true }],
  },
  {
    _id: '5',
    name: 'Vestido verde',
    description: 'Vestido corto y fresco para graduación.',
    rentalPrice: 900,
    images: [v08, v008],
    sizes: [{ size: 'M', available: true }],
  },
  {
    _id: '6',
    name: 'Vestido azul',
    description: 'Vestido corto y fresco para graduación.',
    rentalPrice: 900,
    images: [v026],
    sizes: [{ size: 'M', available: true }],
  },
  {
    _id: '7',
    name: 'Vestido rosa',
    description: 'Vestido corto y fresco para graduación.',
    rentalPrice: 900,
    images: [v013],
    sizes: [{ size: 'M', available: true }],
  },
  {
    _id: '8',
    name: 'Vestido negro',
    description: 'Vestido corto y fresco para graduación.',
    rentalPrice: 900,
    images: [v012],
    sizes: [{ size: 'M', available: true }],
  },
  {
    _id: '9',
    name: 'Vestido Vino',
    description: 'Vestido corto y fresco para graduación.',
    rentalPrice: 900,
    images: [v023],
    sizes: [{ size: 'M', available: true }],
  },
];