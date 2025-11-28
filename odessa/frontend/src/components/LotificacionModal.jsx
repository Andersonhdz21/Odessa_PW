import React, { useState, useEffect } from 'react';
import './LotificacionModal.css';
import CotizadorView from './CotizadorView'; 

const LotificacionModal = ({ 
  subdivision, 
  styles, 
  backdropActive, 
  showContent, 
  onClose, 
  onCotizar: onCotizarProp, 
  currentUser 
}) => {
  const [showQuoteView, setShowQuoteView] = useState(false);

  useEffect(() => {
    if (!showContent) {
      const timer = setTimeout(() => setShowQuoteView(false), 500);
      return () => clearTimeout(timer);
    }
  }, [showContent]);

  if (!subdivision) return null;

  const handleSmartClose = () => {
    if (showQuoteView) {
      setShowQuoteView(false);

      setTimeout(() => {
        onClose();
      }, 500);
    } else {
      onClose();
    }
  };

  const handleCotizarClick = () => {
    if (!currentUser) {
      onCotizarProp();
    } else {
      setShowQuoteView(true);
    }
  };

  const handleBackToDetails = () => {
    setShowQuoteView(false);
  };

  return (
    <>
      <div 
        className={`lot-backdrop ${backdropActive ? 'active' : ''}`} 
        onClick={handleSmartClose}
      ></div>
      
      <div 
        className={`modal-animated-window ${showContent ? 'active-fade' : ''}`}
        style={{
            top: styles?.top, 
            left: styles?.left,
            width: styles?.width, 
            height: styles?.height,
            borderRadius: styles?.borderRadius,
        }}
      >
        <button 
            className={`close-x ${showContent ? 'showing' : 'hiding'}`} 
            onClick={handleSmartClose}
        >
            x
        </button>

        <button 
            className={`back-btn-floating ${showQuoteView ? 'showing' : 'hiding'}`} 
            onClick={handleBackToDetails}
        >
            &lt;
        </button>

        <div className={`modal-slider-wrapper ${showQuoteView ? 'show-quote' : ''}`}>
            
            <div className="view-section">
                <img 
                    src={subdivision.images} 
                    alt={subdivision.name} 
                    className="hero-image-modal"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Sin+Imagen'; }}
                />
                
                <div className={`modal-inner-content ${showContent ? 'visible' : 'hidden'}`}>
                    <div className="modal-header">
                        <h2>{subdivision.name}</h2>
                    </div>
                    
                    <div className="modal-body">
                        <div className="map-container">
                            <div className="iframe-wrapper" dangerouslySetInnerHTML={{ __html: subdivision.location }} />
                        </div>
                        
                        <div className="info-container">
                            <p className="info-text">
                                <span className="info-label">Descripción: </span>
                                {subdivision.description}
                            </p>
                            <p className="info-text">
                                <span className="info-label">Ubicación: </span>
                                {subdivision.department}, El Salvador
                            </p>
                            
                            <div className="modal-actions">
                                <button className="btn-cotizar" onClick={handleCotizarClick}>
                                    {currentUser ? 'Cotizar' : 'Iniciar Sesión'}
                                </button>
                                {!currentUser && (
                                    <p className="login-warning">Inicie sesión para realizar cotización</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="view-section" style={{ backgroundColor: '#e0e0e0' }}>
                <div className={`modal-inner-content ${showContent ? 'visible' : 'hidden'}`} style={{ padding: 0 }}>
                    <CotizadorView 
                        subdivision={subdivision}
                        onAsesorar={() => console.log("Contactando asesor...")}
                    />
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default LotificacionModal;