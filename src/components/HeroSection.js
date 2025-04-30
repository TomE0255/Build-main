import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');  // This will redirect to a signup page
  };

  return (
    <div className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6">Welcome to Our Platform</h1>
        <p className="text-xl mb-8">Building the future of technology, one line of code at a time.</p>
        <button 
          onClick={handleGetStarted}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HeroSection;