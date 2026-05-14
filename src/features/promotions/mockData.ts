// src/features/promotions/mockData.ts

// Si tus imágenes están en public, usa strings directos: '/images/promo1.jpg'
// Si están en src/assets, impórtalas:
import promo1 from '../../assets/images/vestido1.png'; 
import promo2 from '../../assets/images/vestido2.png';
import promo3 from '../../assets/images/vestido3.png';

export const MOCK_PROMOTIONS = [
  {
    _id: '1',
    title: '✨ Especial de Graduaciones 2025',
    description: 'Sabemos que es tu gran noche. Presenta tu credencial de estudiante y obtén un 15% de descuento en cualquier vestido de la colección "Gala". ¡Brilla más que nunca!',
    startDate: '2025-05-01',
    endDate: '2025-07-30',
    status: 'Activa',
    image: promo3, // Imagen aspiracional
    code: 'GRAD2025' // Código de cupón (opcional visualmente)
  },
  {
    _id: '2',
    title: '💍 Pack Damas de Honor',
    description: '¿Tu mejor amiga se casa? Organícense juntas. Rentando 4 o más vestidos del mismo tono, les regalamos los accesorios (aretes y clutch) para todo el grupo.',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'Activa',
    image: promo1,
    code: 'BRIDESMAID'
  },
  {
    _id: '3',
    title: '🌙 Noches de Verano',
    description: 'Los eventos de noche en jardín son mágicos. Renta cualquier vestido de tela ligera y recibe un descuento especial en la segunda renta del mes.',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    status: 'Próximamente',
    image: promo2,
    code: 'SUMMERVIBES'
  }
];