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
                        Ofrecemos lotes urbanizados y listos para construir, ubicados estratégicamente para garantizar la plusvalía de tu inversión.
                    </p>
                </div>

                <div className="services-grid">

                    <div className="service-card">
                        <div className="icon-wrapper">
                            <Home size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="card-title">Vivienda</h3>
                        <div className="card-text">
                            <p>Infraestructura completa (agua potable, energía eléctrica, calles pavimentadas) y una zona de expansión que asegura el crecimiento del valor de tu propiedad a corto plazo.  Es el espacio perfecto para diseñar la casa que siempre has soñado.</p>
                        </div>
                    </div>

                    <div className="service-card">
                        <div className="icon-wrapper">
                            <Banknote size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="card-title">Plan de pago</h3>
                        <div className="card-text">
                            <p>Te ofrecemos crédito directo con la empresa, cuotas fijas y personalizadas, y la posibilidad de elegir el plazo que mejor se adapte a tu capacidad económica. El primer paso hacia tu lote propio es más fácil de lo que imaginas.</p>
                        </div>
                    </div>

                    <div className="service-card">
                        <div className="icon-wrapper">
                            <Leaf size={48} strokeWidth={1.5} />
                        </div>
                        <h3 className="card-title">Lifestyle</h3>
                        <div className="card-text">
                            <p>No solo vendemos terrenos, creamos comunidades. Disfruta de un estilo de vida superior gracias a nuestras amenidades exclusivas: áreas verdes para relajación, zonas deportivas y espacios de juego seguros para niños.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Services;