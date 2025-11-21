import React, { useState } from "react";
import "./Login.css";

const Register = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registro exitoso");
        onSwitchToLogin();
      } else {
        const error = await response.json();
        alert(error.message || "Error al registrar");
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-overlay" onClick={(e) => {
      if (e.target.className === "login-overlay") onClose();
    }}>
      <div className="login-box">
        <button className="close-x" onClick={onClose}>×</button>
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
          />
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
          <button type="submit">Registrarse</button>
          <p className="switch-form">
            ¿Ya tienes cuenta? <span onClick={onSwitchToLogin}>Inicia sesión</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;