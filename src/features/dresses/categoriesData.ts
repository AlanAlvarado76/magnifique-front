// src/features/dresses/categoriesData.ts

// Importa tus imágenes locales (asegúrate de que los nombres coincidan con los que tienes en assets)
import imgNoche from '../../assets/images/vestido1.png'; 
import imgCoctel from '../../assets/images/vestido2.png';
import imgBoda from '../../assets/images/vestido3.png';
import imgGraduacion from '../../assets/images/v3.png';

export const CATEGORIES = [
  {
    id: '1',
    name: 'Noche',
    image: imgNoche,
    description: 'Elegancia y sofisticación bajo la luna.'
  },
  {
    id: '2',
    name: 'Coctel',
    image: imgCoctel,
    description: 'Estilo chic para eventos de día o tarde.'
  },
  {
    id: '3',
    name: 'Boda',
    image: imgBoda,
    description: 'Diseños de ensueño para el gran día.'
  },
  {
    id: '4',
    name: 'Graduacion',
    image: imgGraduacion,
    description: 'Brilla en tu momento más especial.'
  },
];