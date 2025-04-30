import React from 'react';

function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: "Feature 1",
      description: "Description of feature 1 goes here.",
      icon: "💡",
      link: "/feature1"
    },
    {
      id: 2,
      title: "Feature 2",
      description: "Description of feature 2 goes here.",
      icon: "⚡",
      link: "/feature2"
    },
    {
      id: 3,
      title: "Feature 3",
      description: "Description of feature 3 goes here.",
      icon: "🚀",
      link: "/feature3"
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <button 
                onClick={() => window.location.href = feature.link}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;