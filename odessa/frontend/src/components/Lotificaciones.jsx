import React, { useState, useEffect, useRef, useMemo } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Lotificaciones.css';

const CustomArrow = ({ onClick, direction }) => (
  <div className={`custom-arrow ${direction === 'next' ? 'next-arrow' : 'prev-arrow'}`} onClick={onClick}>
    {direction === 'next' ? <ChevronRight size={24} color="white" strokeWidth={3} /> : <ChevronLeft size={24} color="white" strokeWidth={3} />}
  </div>
);

const Lotificaciones = ({ onOpenLogin }) => {
  const [deptOpen, setDeptOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");
  const [allSubdivisions, setAllSubdivisions] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedSubdivision, setSelectedSubdivision] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [modalStyles, setModalStyles] = useState(null);
  const [originCoords, setOriginCoords] = useState(null);
  const [backdropActive, setBackdropActive] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const dropdownRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDeptOpen(false);
    };
    
    const user = localStorage.getItem('usuario');
    if (user) setCurrentUser(JSON.parse(user));

    window.addEventListener('resize', handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    
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
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubdivisions();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedSubdivision) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [selectedSubdivision]);

  const departamentos = useMemo(() => {
    return [...new Set(allSubdivisions.map(item => item.department).filter(Boolean))].sort();
  }, [allSubdivisions]);

  const processedData = useMemo(() => {
    const filtered = allSubdivisions.filter(item => item.department === selectedDept);
    if (filtered.length === 0) return [];
    if (isMobile) return filtered;
    return filtered.length > 1 && filtered.length < 5 ? [...filtered, ...filtered, ...filtered] : filtered;
  }, [allSubdivisions, selectedDept, isMobile]);

  const settings = useMemo(() => ({
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: isMobile ? 1 : 3,
    speed: 500,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  }), [isMobile]);

  const handleSelectDept = (dept) => {
    setSelectedDept(dept);
    sliderRef.current?.slickGoTo(0);
    setDeptOpen(false);
  };

  const handleCardClick = (item, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const initialStyles = {
      top: rect.top, left: rect.left, width: rect.width, height: rect.height,
      borderRadius: '20px', opacity: 1
    };

    setOriginCoords(initialStyles);
    setModalStyles(initialStyles);
    setSelectedSubdivision(item);
    setShowContent(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setBackdropActive(true);
        const finalWidth = Math.min(window.innerWidth * 0.9, 900);
        const finalHeight = Math.min(window.innerHeight * 0.85, 800);
        
        setModalStyles({
          top: (window.innerHeight - finalHeight) / 2,
          left: (window.innerWidth - finalWidth) / 2,
          width: finalWidth, height: finalHeight,
          borderRadius: '30px', opacity: 1
        });
        setTimeout(() => setShowContent(true), 0);
      });
    });
  };

  const closeModal = () => {
    if (!originCoords) return setSelectedSubdivision(null);
    setShowContent(false);
    setBackdropActive(false);
    setModalStyles({ ...originCoords, borderRadius: '30px' });
    setTimeout(() => {
      setSelectedSubdivision(null);
      setOriginCoords(null);
    }, 400);
  };

  const handleCotizar = () => {
    if (!currentUser && onOpenLogin) {
      closeModal();
      setTimeout(onOpenLogin, 450);
    }
  };

  return (
    <section id="Lotificaciones-section" className="lot-container">
      <div className="top-header-area">
        <div className="title-ribbon">
          <h1>Lotificaciones</h1>
        </div>
        <div className="dropdown-wrapper" ref={dropdownRef}>
          <div className={`department-selector ${deptOpen ? 'open' : ''}`} onClick={() => setDeptOpen(!deptOpen)}>
            <span>{selectedDept || "Cargando..."}</span>
            <ChevronDown className={`dropdown-icon ${deptOpen ? 'rotate' : ''}`} size={20} />
          </div>
          <div className={`dropdown-menu ${deptOpen ? 'menu-open' : 'menu-closed'}`}>
            {departamentos.map(dept => (
              <div key={dept} className="dropdown-item" onClick={() => handleSelectDept(dept)}>{dept}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="carousel-wrapper">
        {processedData.length > 0 ? (
          <Slider ref={sliderRef} {...settings} key={`${selectedDept}-${isMobile ? 'mobile' : 'desktop'}`}>
            {processedData.map((item, index) => {
              const isHidden = selectedSubdivision && selectedSubdivision.name === item.name;
              return (
                <div key={index} className="slide-item-container">
                  <div 
                    className={`slide-card ${isHidden ? 'hidden-card' : ''}`} 
                    onClick={(e) => handleCardClick(item, e)}
                  >
                    <img 
                      src={item.images} 
                      alt={item.name} 
                      onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Sin+Imagen'; }} 
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

      {selectedSubdivision && (
        <>
          <div className={`lot-backdrop ${backdropActive ? 'active' : ''}`} onClick={closeModal}></div>
          <div className="modal-animated-window"
            style={{
                top: modalStyles?.top, left: modalStyles?.left,
                width: modalStyles?.width, height: modalStyles?.height,
                borderRadius: modalStyles?.borderRadius,
            }}
          >
            <img 
                src={selectedSubdivision.images} 
                alt="" 
                className="hero-image-modal"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Sin+Imagen'; }}
            />
            <button className={`close-modal-btn ${showContent ? 'showing' : 'hiding'}`} onClick={closeModal}>
              <X size={30} strokeWidth={5} color="blue"/>
            </button>
            <div className={`modal-inner-content ${showContent ? 'visible' : 'hidden'}`}>
              <div className="modal-header"><h2>{selectedSubdivision.name}</h2></div>
              <div className="modal-body">
                <div className="map-container">
                  <div className="iframe-wrapper" dangerouslySetInnerHTML={{ __html: selectedSubdivision.location }} />
                </div>
                <div className="info-container">
                  <p className="info-text"><span className="info-label">Descripción: </span>{selectedSubdivision.description}</p>
                  <p className="info-text"><span className="info-label">Ubicación: </span>{selectedSubdivision.department}, El Salvador</p>
                  <div className="modal-actions">
                    <button className="btn-cotizar" onClick={handleCotizar}>Cotizar</button>
                    {!currentUser && <p className="login-warning">Para realizar cotización debe iniciar sesión</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Lotificaciones;