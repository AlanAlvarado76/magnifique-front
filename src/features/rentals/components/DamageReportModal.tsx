import React, { useState } from 'react';

interface DamageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { repairCost: number; replacementCost: number; damageNotes: string }) => void;
}

const DamageReportModal: React.FC<DamageModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [repairCost, setRepairCost] = useState(0);
  const [replacementCost, setReplacementCost] = useState(0);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ repairCost, replacementCost, damageNotes: notes });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '400px', maxWidth: '90%' }}>
        <h2 style={{ color: '#dc3545', marginTop: 0 }}>Reportar Daño / Pérdida</h2>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>Esto cambiará el estado de la renta y afectará el inventario.</p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Costo de Reparación ($)</label>
            <input 
              type="number" 
              value={repairCost} 
              onChange={e => setRepairCost(Number(e.target.value))}
              style={{ width: '100%', padding: '8px' }} 
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Costo Reposición (Pérdida Total)</label>
            <input 
              type="number" 
              value={replacementCost} 
              onChange={e => setReplacementCost(Number(e.target.value))}
              style={{ width: '100%', padding: '8px' }} 
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Notas del Daño</label>
            <textarea 
              value={notes} 
              onChange={e => setNotes(e.target.value)}
              required
              rows={3}
              placeholder="Describe el daño (ej: quemadura de cigarro, cierre roto...)"
              style={{ width: '100%', padding: '8px' }} 
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px', cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Confirmar Reporte</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DamageReportModal;