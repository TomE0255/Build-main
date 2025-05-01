import React from 'react';
import { useNavigate } from 'react-router-dom';

function FeaturesSection() {
  const navigate = useNavigate();
  
  const features = [
    {
      id: 1,
      title: "Code Explorer",
      description: "Search, browse, and annotate code to understand functionality. Quickly find implementation examples and add notes to document your understanding.",
      icon: "🔍",
      link: "/explorer",
    },
    {
      id: 2,
      title: "Dependency Visualization",
      description: "See how components and modules relate to each other.",
      icon: "🔄",
      link: "/visualizer",
    },
    {
      id: 3,
      title: "Documentation Generation",
      description: "Automatically extract documentation from code comments.",
      icon: "📝",
      link: "/documentation",
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center text-black">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-black">{feature.title}</h3>
              <p className="text-gray-700 mb-6">{feature.description}</p>
              
              <button 
                onClick={() => navigate(feature.link)}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center group"
              >
                Try It Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
