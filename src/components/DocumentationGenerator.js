import React, { useState } from 'react';

function DocumentationGenerator() {
  const [codeInput, setCodeInput] = useState('');
  const [documentation, setDocumentation] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDocumentation = () => {
    if (!codeInput.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate documentation generation
    setTimeout(() => {
      // Simple parser to extract JSDoc comments
      const lines = codeInput.split('\n');
      const docs = [];
      let currentDoc = [];
      let isInComment = false;
      let targetName = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('/**')) {
          isInComment = true;
          currentDoc = [line];
        } else if (isInComment && line.includes('*/')) {
          isInComment = false;
          currentDoc.push(line);
          
          // Look ahead for function or class name
          for (let j = i + 1; j < Math.min(lines.length, i + 3); j++) {
            const nextLine = lines[j].trim();
            if (nextLine.includes('function') || nextLine.includes('class') || nextLine.includes('const') || nextLine.includes('let')) {
              targetName = nextLine;
              break;
            }
          }
          
          docs.push({
            comment: currentDoc.join('\n'),
            target: targetName
          });
          
          targetName = '';
        } else if (isInComment) {
          currentDoc.push(line);
        }
      }
      
      setDocumentation(docs);
      setIsGenerating(false);
    }, 1500);
  };

  const renderDocumentation = () => {
    if (!documentation) return null;
    
    if (documentation.length === 0) {
      return (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-yellow-700">No documentation comments found in the code.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Generated Documentation</h3>
        
        {documentation.map((doc, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="bg-gray-50 p-3 rounded mb-3">
              <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">{doc.comment}</pre>
            </div>
            {doc.target && (
              <div className="text-sm text-gray-600">
                <strong>Target:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded">{doc.target}</code>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Documentation Generator</h2>
        
        <div className="mb-6 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Extract documentation from code comments to create readable documentation for your team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <label htmlFor="codeInput" className="block text-gray-700 font-medium mb-2">
                Paste your code here:
              </label>
              <textarea
                id="codeInput"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                className="w-full h-80 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/**
 * Calculates the sum of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of a and b
 */
function add(a, b) {
  return a + b;
}"
              ></textarea>
            </div>
            
            <button
              onClick={generateDocumentation}
              disabled={isGenerating || !codeInput.trim()}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300 disabled:opacity-70"
            >
              {isGenerating ? 'Generating...' : 'Generate Documentation'}
            </button>
          </div>
          
          <div>
            {isGenerating ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-4"></div>
                  <p className="text-gray-600">Analyzing code and generating documentation...</p>
                </div>
              </div>
            ) : (
              renderDocumentation() || (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>Documentation will appear here after generation</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DocumentationGenerator;
