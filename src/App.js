import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import MissionSection from './components/MissionSection';
import TechStackSection from './components/TechStackSection';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <FeaturesSection />
              <MissionSection />
              <TechStackSection />
            </>
          } />
          <Route path="/signup" element={<div>Signup Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;