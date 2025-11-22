import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import userIcon from "../assets/user-icon.png";
import Login from "./Login";
import Register from "./Register";

const Navbar = () => {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegister, setMostrarRegister] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      setUsuarioActual(JSON.parse(usuario));
    }
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || document.documentElement.scrollTop;
      const diff = currentY - lastScrollY.current;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // if scrolled down more than 20px and not at top -> hide
          if (diff > 10 && currentY > 60) {
            setHidden(true);
          } else if (diff < -10) {
            // scrolled up -> show
            setHidden(false);
          }
          lastScrollY.current = Math.max(0, currentY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLogin = () => {
    setMostrarLogin(!mostrarLogin);
    setMostrarRegister(false);
    setMenuAbierto(false);
  };

  const toggleRegister = () => {
    setMostrarRegister(!mostrarRegister);
    setMostrarLogin(false);
    setMenuAbierto(false);
  };

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
    setMostrarLogin(false);
    setMostrarRegister(false);
  };

  return (
    <>
  <nav className={`navbar ${hidden ? 'hidden' : ''}`}>
        <div className="logo">
          <img src={logo} alt="Logo Odessa" />
          <span>ODESSA</span>
        </div>

        <div className={`menu-hamburguesa ${menuAbierto ? 'activo' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuAbierto ? 'activo' : ''}`}>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Lotificaciones</a></li>
          <li><a href="#">Contáctanos</a></li>
          <li><a href="#">Preguntas</a></li>
        </ul>

        <div className="user-section">
          {usuarioActual && <span className="nombre-usuario">{usuarioActual.nombre}</span>}
          <div className="user-icon" onClick={toggleLogin}>
            <img src={userIcon} alt="Usuario" />
          </div>
        </div>
      </nav>

  {/* backdrop siempre renderizado para permitir transiciones de blur/opacidad */}
  <div className={`backdrop ${menuAbierto ? 'activo' : ''}`} onClick={toggleMenu}></div>

      {mostrarLogin && (
        <Login 
          onClose={toggleLogin}
          onSwitchToRegister={toggleRegister}
        />
      )}
      
      {mostrarRegister && (
        <Register
          onClose={toggleRegister}
          onSwitchToLogin={toggleLogin}
        />
      )}
    </>
  );
};

export default Navbar;