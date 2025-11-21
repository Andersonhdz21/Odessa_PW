import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
      });
      console.log("register success:", res.data);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.error("register axios error:", err);
      setLoading(false);
      setError(err.response?.data?.message || "Error en el registro");
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  return (
    <div className="login-overlay" onClick={(e) => {
      if (e.target.className === "login-overlay") onClose();
    }}>
      <div className="login-box">
        <button className="close-x" onClick={onClose}>×</button>
        <h2>Registrarse</h2>
        <form onSubmit={onSubmit}>
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
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Repetir contraseña"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>
          <p className="switch-form">
            ¿Ya tienes cuenta? <span onClick={onSwitchToLogin}>Inicia sesión</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;