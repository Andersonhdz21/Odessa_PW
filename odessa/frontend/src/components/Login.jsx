import React, { useState, useEffect } from "react";
import "./Login.css";

const Login = ({ onClose, onSwitchToRegister, onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);

        if (data.user) {
          localStorage.setItem('usuario', JSON.stringify(data.user));
        }

        if (onLogin) onLogin(data.user || null);
        onClose();
      } else {
        
        setErrorMessage("Usuario o contraseña incorrectos. Si no tienes cuenta, regístrate primero.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errorMessage) setErrorMessage("");
  };

  useEffect(() => {
    const prev = document.body.style.overflow || '';
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div className="login-overlay enter" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="login-box enter">
        <button className="close-x" onClick={onClose}>X</button>

        <h2>Iniciar Sesión</h2>

        {errorMessage && (
          <div className="login-error-message">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Entrar</button>

          <p className="switch-form">
            ¿Aún no tienes cuenta? <span onClick={onSwitchToRegister}>Regístrate</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
