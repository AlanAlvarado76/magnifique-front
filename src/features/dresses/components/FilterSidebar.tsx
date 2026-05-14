import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './FilterSidebar.module.css';

const FilterSidebar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState(5000);
  const handleCheckboxChange = (key: string, value: string, checked: boolean) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (checked) {
      newParams.set(key, value); 
    } else {
      newParams.delete(key);    
    }
    
    setSearchParams(newParams);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(Number(e.target.value));
  };

  const applyPriceFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('minPrice', '0');
    newParams.set('maxPrice', priceRange.toString());
    setSearchParams(newParams);
  };

  return (
    <aside className={styles.filtersSidebar}>
      <h2 className={styles.filterTitle}>Filtrar por</h2>

=      <div className={styles.filterGroup}>
        <h3>Categoría</h3>
        <label>
          <input 
            type="checkbox" 
            checked={searchParams.get('category') === 'Noche'}
            onChange={(e) => handleCheckboxChange('category', 'Noche', e.target.checked)}
          /> Noche
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={searchParams.get('category') === 'Coctel'}
            onChange={(e) => handleCheckboxChange('category', 'Coctel', e.target.checked)}
          /> Coctel
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={searchParams.get('category') === 'Boda'}
            onChange={(e) => handleCheckboxChange('category', 'Boda', e.target.checked)}
          /> Boda
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={searchParams.get('category') === 'Graduacion'}
            onChange={(e) => handleCheckboxChange('category', 'Graduacion', e.target.checked)}
          /> Graduación
        </label>
      </div>

=      <div className={styles.filterGroup}>
        <h3>Talla</h3>
        <label>
          <input 
            type="checkbox" 
            checked={searchParams.get('size') === 'S'}
            onChange={(e) => handleCheckboxChange('size', 'S', e.target.checked)}
          /> Chica (S)
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={searchParams.get('size') === 'M'}
            onChange={(e) => handleCheckboxChange('size', 'M', e.target.checked)}
          /> Mediana (M)
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={searchParams.get('size') === 'L'}
            onChange={(e) => handleCheckboxChange('size', 'L', e.target.checked)}
          /> Grande (L)
        </label>
         <label>
          <input 
            type="checkbox" 
            checked={searchParams.get('size') === 'XL'}
            onChange={(e) => handleCheckboxChange('size', 'XL', e.target.checked)}
          /> Extra Grande (XL)
        </label>
      </div>

      <div className={styles.filterGroup}>
        <h3>Color</h3>
        <label>
          <input 
            type="checkbox" 
            checked={searchParams.get('color') === 'Rojo'}
            onChange={(e) => handleCheckboxChange('color', 'Rojo', e.target.checked)}
          /> Rojo
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={searchParams.get('color') === 'Negro'}
            onChange={(e) => handleCheckboxChange('color', 'Negro', e.target.checked)}
          /> Negro
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={searchParams.get('color') === 'Azul'}
            onChange={(e) => handleCheckboxChange('color', 'Azul', e.target.checked)}
          /> Azul
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={searchParams.get('color') === 'Rosa'}
            onChange={(e) => handleCheckboxChange('color', 'Rosa', e.target.checked)}
          /> Rosa
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={searchParams.get('color') === 'Verde'}
            onChange={(e) => handleCheckboxChange('color', 'Verde', e.target.checked)}
          /> Verde
        </label>
      </div>

      <div className={styles.filterGroup}>
        <h3>Precio Máximo (Renta)</h3>
        <input 
          type="range" 
          min="0" 
          max="10000" 
          step="100"
          value={priceRange}
          onChange={handlePriceChange}
          onMouseUp={applyPriceFilter}
          onTouchEnd={applyPriceFilter}
          className={styles.priceRange} 
        />
        <div className={styles.priceValues}>
          <span>$0</span>
          <span>${priceRange}</span>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;