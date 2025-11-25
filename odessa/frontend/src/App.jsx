import React from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Lotificaciones from './components/Lotificaciones';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Lotificaciones />
      <FAQ />
      <Footer />
    </>
  );
}

export default App;
