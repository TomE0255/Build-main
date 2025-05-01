
import React, { useEffect, useRef, useState } from 'react';

function DependencyVisualizer() {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  
  // Mock dependency data - in a real app, this would come from analyzing the codebase
  const dependencies = {
    nodes: [
      { id: 'app', label: 'App', type: 'component', details: 'Main application component' },
      { id: 'router', label: 'Router', type: 'component', details: 'Handles routing between pages' },
      { id: 'home', label: 'Home', type: 'page', details: 'Home page component' },
      { id: 'about', label: 'About', type: 'page', details: 'About page component' },
      { id: 'legacy', label: 'Legacy', type: 'page', details: 'Legacy system interface' },
      { id: 'api', label: 'API', type: 'service', details: 'API service for data fetching' },
      { id: 'utils', label: 'Utils', type: 'utility', details: 'Utility functions' },
      { id: 'helpers', label: 'Helpers', type: 'utility', details: 'Helper functions' },
      { id: 'formatters', label: 'Formatters', type: 'utility', details: 'Data formatting utilities' },
    ],
    links: [
      { source: 'app', target: 'router' },
      { source: 'router', target: 'home' },
      { source: 'router', target: 'about' },
      { source: 'router', target: 'legacy' },
      { source: 'home', target: 'api' },
      { source: 'legacy', target: 'utils' },
      { source: 'utils', target: 'helpers' },
      { source: 'helpers', target: 'formatters' },
      { source: 'about', target: 'api' },
    ]
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = 500;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Simple force-directed graph layout
    const nodes = dependencies.nodes.map(node => ({
      ...node,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0
    }));
    
    const links = dependencies.links.map(link => ({
      ...link,
      source: nodes.find(n => n.id === link.source),
      target: nodes.find(n => n.id === link.target)
    }));
    
    const simulation = () => {
      // Apply forces
      for (let i = 0; i < 100; i++) {
        // Repulsive force between nodes
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 200 / (distance * distance);
            nodes[i].vx += dx * force / distance;
            nodes[i].vy += dy * force / distance;
            nodes[j].vx -= dx * force / distance;
            nodes[j].vy -= dy * force / distance;
          }
        }
        
        // Attractive force along links
        for (const link of links) {
          const dx = link.source.x - link.target.x;
          const dy = link.source.y - link.target.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = distance / 30;
          
          link.source.vx -= dx * force / distance;
          link.source.vy -= dy * force / distance;
          link.target.vx += dx * force / distance;
          link.target.vy += dy * force / distance;
        }
        
        // Update positions
        for (const node of nodes) {
          node.x += node.vx * 0.1;
          node.y += node.vy * 0.1;
          node.vx *= 0.9;
          node.vy *= 0.9;
          
          // Keep nodes within bounds
          node.x = Math.max(50, Math.min(width - 50, node.x));
          node.y = Math.max(50, Math.min(height - 50, node.y));
        }
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw links
      ctx.strokeStyle = '#aaa';
      ctx.lineWidth = 1;
      for (const link of links) {
        ctx.beginPath();
        ctx.moveTo(link.source.x, link.source.y);
        ctx.lineTo(link.target.x, link.target.y);
        ctx.stroke();
      }
      
      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.fillStyle = getNodeColor(node.type);
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '12px Arial';
        ctx.fillText(node.label, node.x, node.y);
      }
      
      // Draw legend
      drawLegend(ctx, width, height);
    };
    
    const getNodeColor = (type) => {
      switch (type) {
        case 'component': return '#3b82f6'; // blue
        case 'page': return '#10b981'; // green
        case 'service': return '#f59e0b'; // amber
        case 'utility': return '#8b5cf6'; // purple
        default: return '#6b7280'; // gray
      }
    };
    
    const drawLegend = (ctx, width, height) => {
      const types = ['component', 'page', 'service', 'utility'];
      const labels = ['Component', 'Page', 'Service', 'Utility'];
      
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.font = '14px Arial';
      
      for (let i = 0; i < types.length; i++) {
        const x = width - 150;
        const y = height - 100 + i * 25;
        
        ctx.beginPath();
        ctx.fillStyle = getNodeColor(types[i]);
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#000';
        ctx.fillText(labels[i], x + 15, y);
      }
    };
    
    // Run simulation once
    simulation();
    
    // Add interaction
    let isDragging = false;
    let draggedNode = null;
    
    canvas.addEventListener('mousedown', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if a node was clicked
      for (const node of nodes) {
        const dx = node.x - x;
        const dy = node.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 20) {
          isDragging = true;
          draggedNode = node;
          setSelectedNode(dependencies.nodes.find(n => n.id === node.id));
          break;
        }
      }
    });
    
    canvas.addEventListener('mousemove', (e) => {
      if (isDragging && draggedNode) {
        const rect = canvas.getBoundingClientRect();
        draggedNode.x = e.clientX - rect.left;
        draggedNode.y = e.clientY - rect.top;
        simulation();
      }
    });
    
    canvas.addEventListener('mouseup', () => {
      isDragging = false;
      draggedNode = null;
    });
    
    // Clean up
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Dependency Visualization</h2>
        
        <div className="mb-6 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how components and modules relate to each other. Drag nodes to rearrange the visualization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-4 rounded-lg border">
            <div className="w-full h-[500px] relative">
              <canvas ref={canvasRef} className="w-full h-full"></canvas>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg border mb-6">
              <h3 className="font-medium mb-3">Selected Component</h3>
              {selectedNode ? (
                <div>
                  <div className="mb-2">
                    <span className="font-medium">Name:</span> {selectedNode.label}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Type:</span> {selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)}
                  </div>
                  <div>
                    <span className="font-medium">Details:</span> {selectedNode.details}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Click on a node to see details</p>
              )}
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium mb-3">Instructions</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Click and drag nodes to rearrange the visualization</li>
                <li>Click on a node to view its details</li>
                <li>Different colors represent different types of components</li>
                <li>Lines show dependencies between components</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DependencyVisualizer;
