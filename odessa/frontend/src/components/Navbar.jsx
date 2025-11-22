import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import userIcon from "../assets/user-icon.png";
import Login from "./Login";
import Register from "./Register";

const Navbar = () => {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mostrarRegister, setMostrarRegister] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const prevBodyOverflow = useRef('');

  // ... (otros useEffects y funciones sin cambios) ...

  useEffect(() => {
    // Verifica si hay un usuario en localStorage
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      setUsuarioActual(JSON.parse(usuario));
    }
  }, []);

  // esconder y mostrar navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || document.documentElement.scrollTop;
      const diff = currentY - lastScrollY.current;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // si escroleo 20px abajo -> esconder
          if (diff > 10 && currentY > 60) {
            setHidden(true);
          } else if (diff < -10) {
            // scrolled arriba-> mostrar
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

  // bloquear scroll del body cuando el menú hamburguesa está abierto
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
    // if user is logged in, open user menu instead
    if (usuarioActual) {
      setUserMenuOpen(!userMenuOpen);
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

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
    setMostrarLogin(false);
    setMostrarRegister(false);
    setUserMenuOpen(false);
  };

  const handleLoginSuccess = (user) => {
    // set user from callback after successful login
    if (user) setUsuarioActual(user);
    else {
      // fallback: try reading localStorage
      const u = localStorage.getItem('usuario');
      if (u) setUsuarioActual(JSON.parse(u));
    }
    setMostrarLogin(false);
  };

  const handleLogout = () => {
    // clear storage and state
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuarioActual(null);
    setUserMenuOpen(false); // Cierra el menú después de cerrar sesión
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
          <div className="user-block">
            <div 
              className="user-icon" 
              onClick={toggleLogin} 
              role="button" 
              tabIndex={0}
              // ⚠️ Añadido para asegurar que el icono no cierre el menú si ya está abierto y se hace clic en él
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

      {/* 🟢 MENÚ DE USUARIO Y BACKDROP FUERA DEL NAV */}
      {userMenuOpen && usuarioActual && (
        <>
          {/* 1. BACKDROP INVISIBLE PARA DETECTAR CLIC FUERA */}
          <div className="user-menu-backdrop" onClick={() => setUserMenuOpen(false)} />
          
          {/* 2. MENÚ DESPLEGABLE */}
          <div className="user-menu enter">
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