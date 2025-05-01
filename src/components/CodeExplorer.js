
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeExplorer() {
  const [codebase, setCodebase] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [annotations, setAnnotations] = useState({});
  const [newAnnotation, setNewAnnotation] = useState('');
  const [annotatingLine, setAnnotatingLine] = useState(null);
  
  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate loading a codebase
    const mockCodebase = {
      'src/app.js': `import React from 'react';\nimport { Router } from './router';\n\nfunction App() {\n  return <Router />;\n}\n\nexport default App;`,
      'src/router.js': `import React from 'react';\nimport { Routes, Route } from 'react-router-dom';\nimport { Home, About, Legacy } from './pages';\n\nexport function Router() {\n  return (\n    <Routes>\n      <Route path="/" element={<Home />} />\n      <Route path="/about" element={<About />} />\n      <Route path="/legacy" element={<Legacy />} />\n    </Routes>\n  );\n}`,
      'src/pages/index.js': `export { Home } from './Home';\nexport { About } from './About';\nexport { Legacy } from './Legacy';`,
      'src/pages/Home.js': `import React from 'react';\n\nexport function Home() {\n  return <div>Home Page</div>;\n}`,
      'src/pages/About.js': `import React from 'react';\n\nexport function About() {\n  return <div>About Page</div>;\n}`,
      'src/pages/Legacy.js': `import React from 'react';\nimport { useEffect } from 'react';\nimport { fetchLegacyData } from '../utils/api';\n\nexport function Legacy() {\n  useEffect(() => {\n    // This is a legacy component that uses old patterns\n    fetchLegacyData().then(data => {\n      console.log('Legacy data:', data);\n      // Do something with the data\n    });\n  }, []);\n\n  return <div>Legacy System Interface</div>;\n}`,
      'src/utils/api.js': `// Legacy API utilities\n\nexport function fetchLegacyData() {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve({\n        status: 'success',\n        data: {\n          // Simulated legacy data structure\n          records: [\n            { id: 1, name: 'Legacy Record 1' },\n            { id: 2, name: 'Legacy Record 2' },\n          ]\n        }\n      });\n    }, 1000);\n  });\n}`
    };
    
    setCodebase(mockCodebase);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Search through codebase
    const results = Object.entries(codebase)
      .filter(([path, code]) => 
        code.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(([path, code]) => {
        const lines = code.split('\n');
        const matchingLines = lines
          .map((line, i) => ({ line, lineNumber: i + 1 }))
          .filter(({ line }) => 
            line.toLowerCase().includes(searchQuery.toLowerCase())
          );
        
        return {
          path,
          matches: matchingLines
        };
      });
    
    setSearchResults(results);
  };

  const addAnnotation = (filePath, lineNumber) => {
    if (!newAnnotation.trim()) return;
    
    setAnnotations(prev => ({
      ...prev,
      [filePath]: {
        ...(prev[filePath] || {}),
        [lineNumber]: newAnnotation
      }
    }));
    
    setNewAnnotation('');
    setAnnotatingLine(null);
  };

  const handleFileSelect = (filePath) => {
    setSelectedFile(filePath);
  };

  const renderFileTree = () => {
    const fileStructure = {};
    
    // Organize files into a tree structure
    Object.keys(codebase).forEach(path => {
      const parts = path.split('/');
      let current = fileStructure;
      
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = path;
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      });
    });
    
    // Recursive function to render the tree
    const renderTree = (node, prefix = '') => {
      return Object.entries(node).map(([key, value]) => {
        const path = typeof value === 'string' ? value : `${prefix}${key}/`;
        
        if (typeof value === 'string') {
          return (
            <div 
              key={value}
              className={`py-1 px-2 cursor-pointer hover:bg-gray-100 ${selectedFile === value ? 'bg-blue-100' : ''}`}
              onClick={() => handleFileSelect(value)}
            >
              <span className="text-gray-700">{key}</span>
            </div>
          );
        } else {
          return (
            <div key={path}>
              <div className="py-1 px-2 font-medium">{key}/</div>
              <div className="pl-4">
                {renderTree(value, `${prefix}${key}/`)}
              </div>
            </div>
          );
        }
      });
    };
    
    return (
      <div className="border rounded-lg p-3 bg-white">
        <h3 className="font-medium mb-2">Files</h3>
        {renderTree(fileStructure)}
      </div>
    );
  };

  const renderCodeView = () => {
    if (!selectedFile) {
      return (
        <div className="h-full flex items-center justify-center text-gray-500">
          <p>Select a file to view its code</p>
        </div>
      );
    }
    
    const code = codebase[selectedFile];
    const lines = code.split('\n');
    
    return (
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="font-medium">{selectedFile}</h3>
        </div>
        <div className="relative">
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            showLineNumbers={true}
            wrapLines={true}
            lineProps={lineNumber => {
              const hasAnnotation = annotations[selectedFile]?.[lineNumber];
              return {
                style: { display: 'block', cursor: 'pointer' },
                onClick: () => setAnnotatingLine(lineNumber),
                className: hasAnnotation ? 'border-l-4 border-yellow-400' : ''
              };
            }}
          >
            {code}
          </SyntaxHighlighter>
          
          {annotatingLine && (
            <div className="absolute bottom-0 left-0 right-0 bg-gray-100 p-3 border-t">
              <div className="flex">
                <input
                  type="text"
                  value={newAnnotation}
                  onChange={(e) => setNewAnnotation(e.target.value)}
                  placeholder="Add your annotation here..."
                  className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => addAnnotation(selectedFile, annotatingLine)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAnnotations = () => {
    if (!selectedFile || !annotations[selectedFile] || Object.keys(annotations[selectedFile]).length === 0) {
      return (
        <div className="border rounded-lg p-4 bg-white">
          <p className="text-gray-500 text-center">No annotations for this file</p>
        </div>
      );
    }
    
    return (
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="font-medium mb-3">Annotations</h3>
        <div className="space-y-3">
          {Object.entries(annotations[selectedFile]).map(([lineNumber, note]) => (
            <div key={lineNumber} className="bg-yellow-50 p-3 rounded border border-yellow-200">
              <div className="text-sm text-gray-600 mb-1">Line {lineNumber}:</div>
              <p className="text-gray-800">{note}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Code Explorer</h2>
        
        <div className="mb-6">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search codebase..."
              className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>
        
        {searchResults.length > 0 && (
          <div className="mb-6 bg-white p-4 rounded-lg border">
            <h3 className="font-medium mb-3">Search Results</h3>
            <div className="space-y-3">
              {searchResults.map((result, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                  <div 
                    className="font-medium text-blue-600 cursor-pointer hover:underline"
                    onClick={() => handleFileSelect(result.path)}
                  >
                    {result.path}
                  </div>
                  <div className="mt-1 pl-4 text-sm">
                    {result.matches.map((match, i) => (
                      <div key={i} className="text-gray-700">
                        Line {match.lineNumber}: {match.line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            {renderFileTree()}
          </div>
          
          <div className="lg:col-span-2">
            {renderCodeView()}
          </div>
          
          <div className="lg:col-span-1">
            {renderAnnotations()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CodeExplorer;
