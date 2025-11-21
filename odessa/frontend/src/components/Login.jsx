import React, { useState } from "react";
import "./Login.css";

const Login = ({ onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        onClose();
      } else {
        const error = await response.json();
        alert(error.message || "Error al iniciar sesión");
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
        <h2>Iniciar Sesión</h2>
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
}
export default Login;