import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DressCard from '../components/DressCard';
import FilterSidebar from '../components/FilterSidebar';
import styles from './DressesCatalogPage.module.css';
import apiClient from '@/api/axiosClient';
// 👇 1. IMPORTAMOS LA INTERFAZ CENTRAL (en lugar de escribirla abajo)
import type { Dress } from '@/features/dresses/types/Dress';

// ❌ BORRA LA 'interface Dress' QUE TENÍAS AQUÍ LOCALMENTE

const DressesCatalogPage: React.FC = () => {
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15; 
  
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    const fetchDresses = async () => {
      setLoading(true);
      try {
        const params = Object.fromEntries(searchParams.entries());
        const response = await apiClient.get('/dress/dresses', { params });
        setDresses(response.data);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error cargando vestidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDresses();
  }, [searchParams]);

  // Lógica de Paginación
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentDresses = dresses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dresses.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>
        {categoryFilter ? `Colección: ${categoryFilter}` : ''}
      </h1>
      
      <div className={styles.catalogLayout}>
        <FilterSidebar />
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <main className={styles.grid}>
            {loading ? (
              <p style={{ width: '100%', textAlign: 'center' }}>Cargando vestidos...</p>
            ) : currentDresses.length > 0 ? (
              currentDresses.map((dress) => (
                <DressCard key={dress._id} dress={dress} />
              ))
            ) : (
              <p style={{ width: '100%', textAlign: 'center' }}>
                No se encontraron vestidos con estos filtros.
              </p>
            )}
          </main>

          {/* Paginación con estilos CSS */}
          {!loading && totalPages > 1 && (
            <div className={styles.paginationContainer}>
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${styles.pageButton} ${styles.navButton}`}
              >
                &lt; Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`${styles.pageButton} ${currentPage === number ? styles.activePage : ''}`}
                >
                  {number}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${styles.pageButton} ${styles.navButton}`}
              >
                Siguiente &gt;
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DressesCatalogPage;