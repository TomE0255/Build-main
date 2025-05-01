import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  const handleExploreCode = () => {
    navigate('/explorer');
  };

  const handleViewDependencies = () => {
    navigate('/visualizer');
  };

  return (
    <div className="bg-white text-black py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Understand Legacy Code Faster</h1>
        <p className="text-xl mb-12 max-w-3xl mx-auto">
          CodeInsight helps developers quickly understand unfamiliar codebases,
          find implementation examples, and visualize dependencies to reduce
          development time and minimize errors.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={handleExploreCode}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium transition duration-300">
            Explore Code
          </button>
          <button 
            onClick={handleViewDependencies}
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-md text-lg font-medium border border-blue-500 transition duration-300">
            View Dependencies
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
