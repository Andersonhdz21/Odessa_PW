import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import canariasImg from "./imagenes/Canarias.jpg";
import marsellaImg from "./imagenes/Marsella.jpg";
import "./Lots.css";

const lotificaciones = [
  {
    id: 1,
    nombre: "Las Canarias",
    img: canariasImg,
    info: {
      extension: "35 manzanas",
      disponibles: 42,
      ocupados: 18,
      precioMin: 3500,
      precioMax: 7800,
    },
  },
  
  {
    id: 2,
    nombre: "Marsella",
    img: marsellaImg,
    info: {
      extension: "22 manzanas",
      disponibles: 15,
      ocupados: 30,
      precioMin: 2800,
      precioMax: 6200,
    },
  },
];

function Lots() {
  const location = useLocation();
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/lotificaciones") {
      console.log("Estás en la pantalla de lotes");
    }
  }, [location]);

  const loteActual = lotificaciones[index];

  const siguiente = () => setIndex((prev) => (prev + 1) % lotificaciones.length);
  const anterior = () => setIndex((prev) => (prev - 1 + lotificaciones.length) % lotificaciones.length);

  return (
    <div className="lots-container">
      <div className="lots-header">
        <h1>Lista de Lotificaciones</h1>
      </div>

      <div className="carousel">
        <button onClick={anterior} className="nav-btn">←</button>

        <div className="lote" onClick={() => setModalOpen(true)}>
          <img src={loteActual.img} alt={loteActual.nombre} className="lot-image" />
          <h3>{loteActual.nombre}</h3>
        </div>

        <button onClick={siguiente} className="nav-btn">→</button>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={loteActual.img} alt={loteActual.nombre} className="modal-image" />
            <h2>{loteActual.nombre}</h2>
            <ul>
              <li><strong>Extensión:</strong> {loteActual.info.extension}</li>
              <li><strong>Disponibles:</strong> {loteActual.info.disponibles}</li>
              <li><strong>Ocupados:</strong> {loteActual.info.ocupados}</li>
              <li><strong>Precio mínimo:</strong> ${loteActual.info.precioMin}</li>
              <li><strong>Precio máximo:</strong> ${loteActual.info.precioMax}</li>
            </ul>
            <button onClick={() => setModalOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lots;