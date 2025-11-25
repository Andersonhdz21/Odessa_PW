import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Lotificaciones.css';

const lotificacionesData = [
  { id: 1, name: 'Las Canarias', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
  { id: 2, name: 'Altos de San Andrés', img: 'https://images.unsplash.com/photo-1591389703635-e15a07b842d7?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, name: 'Brisas del Campo', img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
  { id: 4, name: 'Valle Verde', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
];

const departamentos = ["La Libertad", "San Salvador", "San Miguel", "Santa Ana"];

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next-arrow" onClick={onClick}>
    <ChevronRight size={24} color="white" strokeWidth={3} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev-arrow" onClick={onClick}>
    <ChevronLeft size={24} color="white" strokeWidth={3} />
  </div>
);

const Lotificaciones = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [deptOpen, setDeptOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("La Libertad");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDeptOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "0px", 
        }
      }
    ]
  };

  const handleSelectDept = (dept) => {
    setSelectedDept(dept);
    setDeptOpen(false);
  };

  return (
    <section id="Lotificaciones-section" className="lot-container">
      <div className="top-header-area">
        <div className="title-ribbon">
          <h1>Lotificaciones</h1>
        </div>
        
        <div className="dropdown-wrapper" ref={dropdownRef}>
          <div 
            className={`department-selector ${deptOpen ? 'open' : ''}`} 
            onClick={() => setDeptOpen(!deptOpen)}
          >
            <span>{selectedDept}</span>
            <ChevronDown 
              className={`dropdown-icon ${deptOpen ? 'rotate' : ''}`} 
              size={20} 
            />
          </div>

          <div className={`dropdown-menu ${deptOpen ? 'menu-open' : 'menu-closed'}`}>
            {departamentos.map((dept) => (
              <div 
                key={dept} 
                className="dropdown-item"
                onClick={() => handleSelectDept(dept)}
              >
                {dept}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="carousel-wrapper">
        <Slider {...settings}>
          {lotificacionesData.map((item, index) => (
            <div key={item.id} className="slide-item-container">
              <div className={`slide-card ${index === activeSlide ? 'active' : ''}`}>
                <img src={item.img} alt={item.name} />
                <div className="card-overlay">
                  <span className="location-pill">{item.name}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Lotificaciones;