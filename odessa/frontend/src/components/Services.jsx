import React from 'react';
import { Home, Banknote, Leaf } from 'lucide-react';
import './Services.css';

const Services = () => {
  return (
    <section className="services-section">
      <div className="services-container">
        
        <div className="services-header">
          <h2 className="services-title">¿Que ofrecemos?</h2>
          <p className="services-subtitle">
            loresfesrrgsr rdfgb drgfpoksdg dgdrgknergoe rgergkdrgnsl gsdfgdsnfgkln
          </p>
        </div>

        <div className="services-grid">
          
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

          <div className="service-card">
            <div className="icon-wrapper">
              <Banknote size={48} strokeWidth={1.5} />
            </div>
            <h3 className="card-title">Plan de pago</h3>
            <div className="card-text">
              <p>dgdhg rsgsofhierg</p>
              <p>gsrghsrogih rgosrgjoi</p>
              <p>rgrsohrgo poirjgñoerhgherg</p>
              <p>porogjeorgeorjg</p>
              <p>oirjgfowrifpoewjrfpow</p>
            </div>
          </div>

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