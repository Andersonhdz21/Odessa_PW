import React from 'react';
import './Footer.css';
import WhatsappIcon from '../assets/whatsapp-icon.svg';

const Footer = () => {
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <footer id="footer-section" className="footer-container">
            <div className="footer-content-wrapper">
                <div className="footer-left">
                    <h1 className="footer-logo">ODESSA</h1>
                    <p className="footer-tagline">Un lugar tranquilo para vivir</p>

                    <nav className="footer-nav">
                        <a href="#services-section" className="nav-item">Inicio</a>
                        <a href="#Lotificaciones-section" className="nav-item">Lotificaciones</a>
                    </nav>
                </div>

                <div className="footer-right">
                    <p className="contact-title">Contáctanos:</p>
                    <div
                        className="phone-box"
                        onClick={() => handleCopy('+503 2243 9272')}
                        title="Clic para copiar el número"
                    >
                        <span>+503 2243 9272</span>
                        <svg className="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </div>

                    <div className="schedule-box">
                        <p className="schedule-label">Horario de atención</p>
                        <p className="schedule-time">Lunes a Viernes</p>
                        <p className="schedule-time">8:30 AM - 4:30 PM</p>
                    </div>
                </div>

                <div className="footer-bottom-line"></div>
                
                <div className="footer-icons">
                    <a
                        href="https://wa.me/50360622144"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={WhatsappIcon}
                            alt="Icono de WhatsApp"
                            className="footer-icon whatsapp-icon"
                        />
                    </a>
                </div>

                <div className="footer-copyright">
                    <p>&copy; 2025, ODESSA S.A. de C.V.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;