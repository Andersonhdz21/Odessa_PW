import React from 'react';
import { X } from 'lucide-react';
import './LotificacionModal.css';

const LotificacionModal = ({ 
  subdivision, 
  styles, 
  backdropActive, 
  showContent, 
  onClose, 
  onCotizar, 
  currentUser 
}) => {
  if (!subdivision) return null;

  return (
    <>
      <div 
        className={`lot-backdrop ${backdropActive ? 'active' : ''}`} 
        onClick={onClose}
      ></div>
      
      <div 
        className="modal-animated-window"
        style={{
            top: styles?.top, 
            left: styles?.left,
            width: styles?.width, 
            height: styles?.height,
            borderRadius: styles?.borderRadius,
        }}
      >
        <img 
            src={subdivision.images} 
            alt={subdivision.name} 
            className="hero-image-modal"
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Sin+Imagen'; }}
        />
        
        <button className={`close-modal-btn ${showContent ? 'showing' : 'hiding'}`} onClick={onClose}>
          <X size={30} strokeWidth={5} color="blue"/>
        </button>
        
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
                <button className="btn-cotizar" onClick={onCotizar}>
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
    </>
  );
};

export default LotificacionModal;