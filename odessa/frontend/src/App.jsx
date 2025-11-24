import React from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import FAQ from './components/FAQ';   // ← AÑADIDO
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <FAQ />
      <Footer />
    </>
  );
}

export default App;
