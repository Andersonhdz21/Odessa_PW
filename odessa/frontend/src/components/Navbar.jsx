import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import userIcon from "../assets/user-icon.png";
import Login from "./Login";
import Register from "./Register";

const Navbar = () => {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegister, setMostrarRegister] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      setUsuarioActual(JSON.parse(usuario));
    }
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
      <nav className="navbar">
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

      {menuAbierto && <div className="backdrop" onClick={toggleMenu}></div>}

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