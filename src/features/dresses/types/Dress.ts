export interface Dress {
  _id: string;
  name: string;
  description?: string;
  rentalPrice: number;
  salePrice?: number;
  images: string[];
  collectionDress?: string;
  category?: string;
  status?: 'Nuevo' | 'Usado';
  // 👇 ESTA ES LA CLAVE: Array de objetos
  sizes: {
    size: string;
    available: boolean;
  }[];
}