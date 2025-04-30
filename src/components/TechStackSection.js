import React from 'react';

function TechStack() {
  const technologies = {
    Frontend: ['React', 'Tailwind CSS'],
    Backend: ['Node.js', 'Express'],
    Database: ['MongoDB', 'PostgreSQL']
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(technologies).map(([category, techs]) => (
            <div key={category} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">{category}</h3>
              <ul className="space-y-2">
                {techs.map((tech) => (
                  <li 
                    key={tech}
                    className="flex items-center text-gray-700"
                  >
                    <span className="mr-2">•</span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;