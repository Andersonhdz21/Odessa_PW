import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Footer from './components/Footer';
import './App.css';
import Lots from './pages/Lots';

function App() {
  return (
    <>
      {}
      <Navbar />

      <main>
        {}
        <Routes>

          {}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
              </>
            }
          />

          {}
          <Route path="/lotificaciones" element={<Lots />} />

        </Routes>
      </main>

      <Footer />
      {}
    </>
  );
}

export default App;