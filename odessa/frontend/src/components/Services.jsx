import React from 'react';
import { Home, Banknote, Leaf } from 'lucide-react';
import './Services.css'; // Importamos los estilos vinculados

const Services = () => {
  return (
    <section className="services-section">
      <div className="services-container">
        
        {/* Título y Subtítulo */}
        <div className="services-header">
          <h2 className="services-title">¿Que ofrecemos?</h2>
          <p className="services-subtitle">
            loresfesrrgsr rdfgb drgfpoksdg dgdrgknergoe rgergkdrgnsl gsdfgdsnfgkln
          </p>
        </div>

        {/* Grid de 3 Columnas */}
        <div className="services-grid">
          
          {/* Tarjeta 1: Vivienda */}
          <div className="service-card">
            <div className="icon-wrapper">
              <Home size={48} strokeWidth={1.5} />
            </div>
            <h3 className="card-title">Vivienda</h3>
            <div className="card-text">
              <p>dgdhg rsgsofhierg</p>
              <p>gsrghsrogih rgosrgjoi</p>
              <p>rgrsohrgo poirjgñoerhgherg</p>
              <p>porogjeorgeorjg</p>
              <p>oirjgfowrifpoewjrfpow</p>
            </div>
          </div>

          {/* Tarjeta 2: Plazo de pago */}
          <div className="service-card">
            <div className="icon-wrapper">
              <Banknote size={48} strokeWidth={1.5} />
            </div>
            <h3 className="card-title">Plazo de pago</h3>
            <div className="card-text">
              <p>dgdhg rsgsofhierg</p>
              <p>gsrghsrogih rgosrgjoi</p>
              <p>rgrsohrgo poirjgñoerhgherg</p>
              <p>porogjeorgeorjg</p>
              <p>oirjgfowrifpoewjrfpow</p>
            </div>
          </div>

          {/* Tarjeta 3: Lifestyle */}
          <div className="service-card">
            <div className="icon-wrapper">
              <Leaf size={48} strokeWidth={1.5} />
            </div>
            <h3 className="card-title">Lifestyle</h3>
            <div className="card-text">
              <p>dgdhg rsgsofhierg</p>
              <p>gsrghsrogih rgosrgjoi</p>
              <p>rgrsohrgo poirjgñoerhgherg</p>
              <p>porogjeorgeorjg</p>
              <p>oirjgfowrifpoewjrfpow</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;