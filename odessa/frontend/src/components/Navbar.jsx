import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import userIcon from "../assets/user-icon.png";
import Login from "./Login";
import Register from "./Register";

const Navbar = () => {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); 
  const [mostrarRegister, setMostrarRegister] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const prevBodyOverflow = useRef('');
  
  const CLOSE_ANIMATION_DURATION = 300; 

  const closeUserMenu = () => {
    if (!userMenuOpen) return; 
    if (isClosing) return; 

    setIsClosing(true);
    
    setTimeout(() => {
      setUserMenuOpen(false);
      setIsClosing(false); 
    }, CLOSE_ANIMATION_DURATION);
  };

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      setUsuarioActual(JSON.parse(usuario));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || document.documentElement.scrollTop;
      const diff = currentY - lastScrollY.current;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (diff > 10 && currentY > 60) {
            setHidden(true);
          } else if (diff < -10) {
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

  useEffect(() => {
    if (!userMenuOpen) return;
    const closeMenuOnScroll = () => {
        closeUserMenu(); 
    };
    window.addEventListener('scroll', closeMenuOnScroll, { once: true });
    return () => {
        window.removeEventListener('scroll', closeMenuOnScroll);
    };
  }, [userMenuOpen]);

  useEffect(() => {
    if (menuAbierto) {
      prevBodyOverflow.current = document.body.style.overflow || '';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevBodyOverflow.current || '';
    }
    return () => { document.body.style.overflow = prevBodyOverflow.current || ''; };
  }, [menuAbierto]);

  const toggleLogin = () => {
    if (usuarioActual) {
      if (userMenuOpen) {
        closeUserMenu();
      } else {
        setUserMenuOpen(true);
      }
      setMostrarRegister(false);
      setMenuAbierto(false);
      return;
    }
    setMostrarLogin(!mostrarLogin);
    setMostrarRegister(false);
    setMenuAbierto(false);
  };

  const toggleRegister = () => {
    setMostrarRegister(!mostrarRegister);
    setMostrarLogin(false);
    setMenuAbierto(false);
  };

  // Esta función es para el botón de hamburguesa (abre y cierra)
  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
    setMostrarLogin(false);
    setMostrarRegister(false);
    closeUserMenu(); 
  };

  // NUEVA FUNCIÓN: Solo cierra el menú si ya está abierto.
  // Si estás en desktop (menuAbierto es false), esta función no hace nada.
  const handleLinkClick = () => {
    if (menuAbierto) {
      toggleMenu();
    }
  };

  const handleLoginSuccess = (user) => {
    if (user) setUsuarioActual(user);
    else {
      const u = localStorage.getItem('usuario');
      if (u) setUsuarioActual(JSON.parse(u));
    }
    setMostrarLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuarioActual(null);
    closeUserMenu();
  };

  return (
    <>
      <nav className={`navbar ${hidden ? 'hidden' : ''}`}>
        <div className="logo">
          <img src={logo} alt="Logo Odessa" />
          <span>ODESSA</span>
        </div>

        {/* El botón de hamburguesa sigue usando toggleMenu */}
        <div className={`menu-hamburguesa ${menuAbierto ? 'activo' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* CAMBIO AQUÍ: Usamos handleLinkClick en lugar de toggleMenu */}
        <ul className={`nav-links ${menuAbierto ? 'activo' : ''}`} onClick={handleLinkClick}>
          <li><a href="#services-section">Inicio</a></li>
          <li><a href="#Lotificaciones-section">Lotificaciones</a></li>
          <li><a href="#faq-section">Preguntas</a></li>
          <li><a href="#footer-section">Contáctanos</a></li>
        </ul>

        <div className="user-section">
          <div className="user-block">
            <div 
              className="user-icon" 
              onClick={toggleLogin} 
              role="button" 
              tabIndex={0}
              aria-expanded={userMenuOpen}
            >
              <img src={userIcon} alt="Usuario" />
            </div>
            <div className="user-label">
              {usuarioActual ? (usuarioActual.username || usuarioActual.nombre || usuarioActual.email) : 'Iniciar sesión'}
            </div>
          </div>
        </div>
      </nav>

      {(userMenuOpen || isClosing) && usuarioActual && (
        <>
          <div className="user-menu-backdrop" onClick={closeUserMenu} />
          <div className={`user-menu ${!isClosing ? 'enter' : 'out'}`}> 
            <div className="user-info">
              <strong>{usuarioActual.username || usuarioActual.nombre || usuarioActual.email}</strong>
              <div className="user-email">{usuarioActual.email}</div>
            </div>
            <div className="user-actions">
              <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </div>
        </>
      )}
      
      {/* Backdrop para el menú hamburguesa */}
      <div
        className={`backdrop ${menuAbierto ? 'activo' : ''}`}
        onClick={menuAbierto ? toggleMenu : undefined}
      ></div>

      {mostrarLogin && (
        <Login
          onClose={toggleLogin}
          onSwitchToRegister={toggleRegister}
          onLogin={handleLoginSuccess}
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