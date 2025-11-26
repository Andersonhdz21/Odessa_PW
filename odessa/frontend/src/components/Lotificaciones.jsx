import React, { useState, useEffect, useRef, useMemo } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Lotificaciones.css';

//arrows
const NextArrow = ({ onClick, className, style }) => (
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
  //state
  const [activeSlide, setActiveSlide] = useState(0);
  const [deptOpen, setDeptOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(""); 
  const [allSubdivisions, setAllSubdivisions] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dropdownRef = useRef(null);

  //ui listeners
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDeptOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //fetch data
  useEffect(() => {
    const fetchSubdivisions = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/subdivisions');
        
        if (response.ok) {
          const data = await response.json();
          setAllSubdivisions(data);

          if (data.length > 0) {
            const hasLaLibertad = data.some(item => item.department === 'La Libertad');
            setSelectedDept(hasLaLibertad ? 'La Libertad' : data[0].department);
          }
        } else {
          console.error("Error al obtener lotificaciones del servidor");
        }
      } catch (error) {
        console.error("Error de conexión con el backend:", error);
      }
    };

    fetchSubdivisions();
  }, []);

  //data logic
  const departamentos = useMemo(() => {
    if (!allSubdivisions.length) return [];
    const depts = allSubdivisions.map(item => item.department).filter(Boolean);
    return [...new Set(depts)].sort(); 
  }, [allSubdivisions]);

  const filteredData = useMemo(() => {
    if (!selectedDept) return [];
    return allSubdivisions.filter(item => item.department === selectedDept);
  }, [allSubdivisions, selectedDept]);

  const processedData = useMemo(() => {
    if (filteredData.length === 0) return [];
    if (isMobile) return filteredData;

    const count = filteredData.length;
    if (count > 1 && count < 5) {
        return [...filteredData, ...filteredData, ...filteredData];
    }
    
    return filteredData;
  }, [isMobile, filteredData]);

  //slider config
  const settings = useMemo(() => ({
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: isMobile ? 1 : 3,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setActiveSlide(next % (filteredData.length || 1)),
  }), [isMobile, filteredData.length]);

  const handleSelectDept = (dept) => {
    setSelectedDept(dept);
    setActiveSlide(0); 
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
            <span>{selectedDept || "Cargando..."}</span>
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
        {processedData.length > 0 ? (
            <Slider {...settings} key={`${selectedDept}-${isMobile ? 'mobile' : 'desktop'}`}>
            {processedData.map((item, index) => {
                return (
                <div key={index} className="slide-item-container">
                    <div className={`slide-card`}>
                    <img 
                        src={item.images} 
                        alt={item.name} 
                        onError={(e) => { 
                            e.target.onerror = null; 
                            e.target.src = '../../assets/imageOnError.png'; 
                        }} 
                    />
                    <div className="card-overlay">
                        <span className="location-pill">{item.name}</span>
                    </div>
                    </div>
                </div>
                );
            })}
            </Slider>
        ) : (
            <div style={{ textAlign: 'center', color: 'white', marginTop: '50px', fontSize: '1.2rem' }}>
                <p>No hay lotificaciones disponibles en este departamento.</p>
            </div>
        )}
      </div>
    </section>
  );
};

export default Lotificaciones;