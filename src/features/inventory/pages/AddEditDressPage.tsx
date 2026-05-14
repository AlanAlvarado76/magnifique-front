import React, { useState, useEffect } from 'react';
import styles from './AddEditDressPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '@/api/axiosClient';
import { AxiosError } from 'axios';

// Definimos la estructura local para el formulario
interface SizeOption {
  size: string;
  available: boolean;
}

const AddEditDressPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Estados del formulario
  const [name, setName] = useState('');
  const [sizes, setSizes] = useState<SizeOption[]>([{ size: 'M', available: true }]);
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [collectionDress, setCollectionDress] = useState('');
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [rentalPrice, setRentalPrice] = useState(0);
  const [supplier, setSupplier] = useState('');
  const [status, setStatus] = useState('Nuevo');
  
  // Estado para imágenes (Archivos reales)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  // Estado para mostrar la imagen actual si estamos editando
  const [existingImagePreview, setExistingImagePreview] = useState('');

  // Cargar datos si estamos editando
  useEffect(() => {
    if (isEditMode) {
      const fetchDress = async () => {
        try {
          const response = await apiClient.get(`/dress/${id}`);
          const data = response.data;

          setName(data.name);
          
          if (data.sizes && data.sizes.length > 0) {
            setSizes(data.sizes);
          } else {
             setSizes([{ size: data.size || 'M', available: data.available ?? true }]);
          }

          setColor(data.color);
          setBrand(data.brand);
          setCollectionDress(data.collectionDress);
          setPurchasePrice(data.purchasePrice);
          setSalePrice(data.salePrice);
          setRentalPrice(data.rentalPrice);
          setSupplier(data.supplier);
          setStatus(data.status);
          
          // Guardamos la imagen actual para mostrarla como referencia
          if (data.images && data.images.length > 0) {
            setExistingImagePreview(data.images[0]);
          }
        } catch (error) {
          console.error('Error al cargar vestido:', error);
          alert('No se pudo cargar la información del vestido.');
          navigate('/admin/inventario');
        }
      };
      fetchDress();
    }
  }, [id, isEditMode, navigate]);

  // --- MANEJO DE TALLAS ---
  const handleAddSize = () => {
    setSizes([...sizes, { size: 'M', available: true }]);
  };

  const handleRemoveSize = (index: number) => {
    const newSizes = [...sizes];
    newSizes.splice(index, 1);
    setSizes(newSizes);
  };

  const handleSizeChange = <K extends keyof SizeOption>(
    index: number, 
    field: K, 
    value: SizeOption[K]
  ) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  // --- MANEJO DE ARCHIVOS ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  // --- ENVÍO DEL FORMULARIO ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Usamos FormData para poder enviar archivos
    const formData = new FormData();
    formData.append('name', name);
    formData.append('color', color);
    formData.append('brand', brand);
    formData.append('collectionDress', collectionDress);
    formData.append('purchasePrice', purchasePrice.toString());
    formData.append('salePrice', salePrice.toString());
    formData.append('rentalPrice', rentalPrice.toString());
    formData.append('supplier', supplier);
    formData.append('status', status);
    
    // IMPORTANTE: Convertimos el array de objetos a string JSON
    formData.append('sizes', JSON.stringify(sizes));

    // 2. Agregamos las imágenes seleccionadas (si hay)
    if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('images', selectedFiles[i]);
        }
    }

    try {
      // Configuración del header para subir archivos
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };

      if (isEditMode) {
        await apiClient.put(`/dress/update/${id}`, formData, config);
        alert('¡Vestido actualizado correctamente!');
      } else {
        await apiClient.post('/dress/create', formData, config);
        alert('¡Vestido guardado exitosamente!');
      }
      
      navigate('/admin/inventario');

    } catch (error) {
      console.error('Error al guardar:', error);
      const err = error as AxiosError<{ message?: string }>;
      alert('Error: ' + (err.response?.data?.message || 'No se pudo conectar con el servidor'));
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1>{isEditMode ? 'Editar Vestido' : 'Agregar Nuevo Vestido'}</h1>

        {/* Grupo 1 */}
        <div className={styles.inputGroup}>
          <label>Nombre del Vestido</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        {/* Sección de Tallas */}
        <div className={styles.inputGroup} style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee' }}>
            <label style={{ marginBottom: '1rem', display: 'block', fontWeight: 'bold' }}>Inventario por Talla</label>
            
            {sizes.map((item, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                    <select 
                        value={item.size} 
                        onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                        style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc', width: '100px' }}
                    >
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', cursor: 'pointer', marginLeft: '10px' }}>
                        <input 
                            type="checkbox" 
                            checked={item.available} 
                            onChange={(e) => handleSizeChange(index, 'available', e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                        />
                        Disponible
                    </label>

                    {sizes.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => handleRemoveSize(index)} 
                          style={{ 
                            color: '#dc3545', border: 'none', background: 'transparent', 
                            cursor: 'pointer', fontSize: '1.2rem', marginLeft: 'auto' 
                          }}
                          title="Quitar talla"
                        >
                            &times;
                        </button>
                    )}
                </div>
            ))}
            
            <button 
              type="button" 
              onClick={handleAddSize} 
              style={{ 
                marginTop: '10px', fontSize: '0.9rem', cursor: 'pointer', 
                color: '#007bff', background: 'none', border: 'none', fontWeight: 600 
              }}
            >
                + Agregar otra talla
            </button>
        </div>

        <div className={styles.row}>
            <div className={styles.inputGroup}>
                <label>Color</label>
                <input type="text" value={color} onChange={e => setColor(e.target.value)} required />
            </div>
            <div className={styles.inputGroup}>
                <label>Marca</label>
                <input type="text" value={brand} onChange={e => setBrand(e.target.value)} required />
            </div>
        </div>

        <div className={styles.row}>
            <div className={styles.inputGroup}>
                <label>Categoría (Evento)</label>
                <select 
                  value={collectionDress} 
                  onChange={e => setCollectionDress(e.target.value)} 
                  required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="Noche">Noche</option>
                    <option value="Coctel">Coctel</option>
                    <option value="Boda">Boda</option>
                    <option value="Graduacion">Graduación</option>
                </select>
            </div>
            <div className={styles.inputGroup}>
                <label>Proveedor</label>
                <input type="text" value={supplier} onChange={e => setSupplier(e.target.value)} required />
            </div>
        </div>

        <div className={styles.inputGroup}>
            <label>Estado del Vestido</label>
            <select 
              value={status} 
              onChange={e => setStatus(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
            >
                <option value="Nuevo">Nuevo (Etiqueta)</option>
                <option value="Usado">Usado (Pre-loved)</option>
            </select>
        </div>

        {/* Grupo Precios */}
        <div className={styles.priceGroup}>
          <div className={styles.inputGroup}>
            <label>Compra ($)</label>
            <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} required />
          </div>
          <div className={styles.inputGroup}>
            <label>Venta ($)</label>
            <input type="number" value={salePrice} onChange={e => setSalePrice(Number(e.target.value))} required />
          </div>
          <div className={styles.inputGroup}>
            <label>Renta ($)</label>
            <input type="number" value={rentalPrice} onChange={e => setRentalPrice(Number(e.target.value))} required />
          </div>
        </div>

        {/* 👇 NUEVO INPUT PARA SUBIR ARCHIVOS */}
        <div className={styles.inputGroup}>
          <label>Fotos del Vestido</label>
          <input 
            type="file" 
            accept="image/*" 
            multiple // Permite seleccionar varias fotos
            onChange={handleFileChange}
            // Solo es obligatorio si es nuevo y no estamos editando
            required={!isEditMode && !existingImagePreview} 
            style={{ padding: '10px', border: '1px dashed #ccc', width: '100%', backgroundColor: '#fff' }}
          />
          
          {/* Mensaje de archivos seleccionados */}
          {selectedFiles && (
             <div style={{ marginTop: 10, fontSize: '0.9rem', color: '#28a745', fontWeight: 'bold' }}>
                ✅ {selectedFiles.length} archivo(s) seleccionado(s) para subir.
             </div>
          )}

          {/* Vista previa de imagen actual (solo en edición) */}
          {isEditMode && existingImagePreview && !selectedFiles && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Imagen actual:</p>
              <img 
                src={existingImagePreview} 
                alt="Actual" 
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
            </div>
          )}
        </div>

        <div className={styles.buttonRow}>
          <button type="submit" className={styles.submitButton}>
            {isEditMode ? 'Actualizar Vestido' : 'Guardar y Subir'}
          </button>
          <button type="button" className={styles.cancelButton} onClick={() => navigate('/admin/inventario')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddEditDressPage;