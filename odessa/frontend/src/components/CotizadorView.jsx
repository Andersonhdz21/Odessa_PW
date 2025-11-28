import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import './CotizadorView.css';

const CotizadorView = ({ subdivision, onAsesorar }) => {
  const [lots, setLots] = useState([]);
  const [selectedLotId, setSelectedLotId] = useState('');
  const [loading, setLoading] = useState(true);
  const [plazo, setPlazo] = useState('');
  const [prima, setPrima] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/lots?subdivisionId=${subdivision.id}`);
        if (response.ok) {
          const data = await response.json();
          setLots(data);
          if (data.length > 0) setSelectedLotId(data[0].id);
        }
      } catch (error) {
        console.error("Error cargando lotes:", error);
      } finally {
        setLoading(false);
      }
    };
    if (subdivision?.id) fetchLots();
  }, [subdivision]);

  const currentLot = useMemo(() => {
    return lots.find(l => l.id == selectedLotId) || null;
  }, [lots, selectedLotId]);

  const isVendido = currentLot?.estatus === 'vendido';
  
  const calculos = useMemo(() => {
    if (!currentLot || isVendido) return { totalMensual: "0.00" };
    
    const precio = parseFloat(currentLot.price) || 0;
    const primaNum = parseFloat(prima) || 0;
    const plazoNum = parseInt(plazo) || 0; 
    
    if (plazoNum === 0) return { totalMensual: "0.00", precio, maxPrima: precio };

    const saldo = precio - primaNum;
    const mensualidad = saldo > 0 ? saldo / plazoNum : 0;
    
    return {
      totalMensual: mensualidad.toFixed(2),
      precio,
      maxPrima: precio
    };
  }, [currentLot, plazo, prima, isVendido]);

  const handlePrimaChange = (e) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) val = '';
    if (currentLot && val > currentLot.price) val = currentLot.price;
    setPrima(val);
  };

  const handleSelectLot = (lotId) => {
    setSelectedLotId(lotId);
    setPrima('');
    setPlazo('');
    setDropdownOpen(false);
  };

  const locationString = currentLot 
    ? `${currentLot.location}, ${subdivision.name}, ${subdivision.department}, El Salvador`
    : 'Cargando ubicación...';

  if (loading) return <div className="loading-state">Cargando...</div>;

  return (
    <div className="cotizador-container">
      <h2 className="cotizador-title">Cotización</h2>

      <div className="cotizador-content">
        <div className="cotizador-visual">
          {currentLot && (
            <div className={`status-pill ${isVendido ? 'vendido' : 'disponible'}`}>
              {isVendido ? 'Vendido' : 'Disponible'}
            </div>
          )}
          
          <div className="image-frame-cotizador">
            <img 
              src={subdivision.images} 
              alt={subdivision.name} 
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Sin+Imagen'; }}
            />
          </div>

          <button className="btn-asesorar-view" onClick={onAsesorar}>
            Asesorar
          </button>
        </div>

        <div className="cotizador-info-panel">
          <div className="data-row" style={{ zIndex: 50 }}>
            <label className="data-label">Lote:</label>
            <div className="custom-select-wrapper" ref={dropdownRef}>
                <div 
                    className={`custom-select-trigger ${dropdownOpen ? 'open' : ''}`} 
                    onClick={() => !lots.length ? null : setDropdownOpen(!dropdownOpen)}
                >
                    <span>{currentLot ? currentLot.name : "Seleccionar"}</span>
                    <ChevronDown className={`custom-dropdown-icon ${dropdownOpen ? 'rotate' : ''}`} size={20} />
                </div>

                <div className={`custom-dropdown-menu ${dropdownOpen ? 'menu-open' : 'menu-closed'}`}>
                    {lots.map(lot => (
                        <div 
                            key={lot.id} 
                            className="custom-dropdown-item" 
                            onClick={() => handleSelectLot(lot.id)}
                        >
                            {lot.name}
                        </div>
                    ))}
                    {lots.length === 0 && <div className="custom-dropdown-item">No hay lotes</div>}
                </div>
            </div>
          </div>

          <div className="data-row">
            <span className="data-label">Dimensiones:</span>
            <span className="data-value">{currentLot?.size || 0} mts<sup>2</sup></span>
          </div>

          <div className="data-row">
            <span className="data-label">Servicios:</span>
            <span className="data-value">Agua y Luz</span>
          </div>

          <div className="data-row">
            <span className="data-label">Ubicación:</span>
            <span className="data-value">{locationString}</span>
          </div>

          {!isVendido && currentLot && (
            <>
              <div className="data-row" style={{ marginBottom: '15px' }}>
                <span className="data-label">Precio:</span>
                <span className="data-value font-bold">${parseFloat(currentLot.price).toLocaleString('en-US')}</span>
              </div>

              <div className="calculator-area">
                <div className="input-row-inline">
                    <label className="input-label-inline">Plazo:</label>
                    <div className="thin-input-box">
                        <input 
                          type="number" 
                          min="6" 
                          max="300" 
                          value={plazo}
                          onChange={(e) => setPlazo(e.target.value)}
                          className="styled-input"
                          placeholder="Min: 6 Max: 300 (meses)"
                        />
                    </div>
                </div>

                <div className="input-row-inline">
                    <label className="input-label-inline">Prima:</label>
                    <div className="thin-input-box">
                        <input 
                            type="number" 
                            min="0" 
                            value={prima}
                            onChange={handlePrimaChange}
                            className="styled-input"
                            placeholder="Min: $0.00"
                        />
                    </div>
                </div>

                <div className="total-bar-container">
                  <span className="total-text-label">Total:</span>
                  <div className="total-result-pill">
                    ~${calculos.totalMensual} x {plazo || 0} meses
                  </div>
                </div>
              </div>
            </>
          )}

          {isVendido && (
            <div className="vendido-message-box">
               Lote no disponible para cotización.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CotizadorView;