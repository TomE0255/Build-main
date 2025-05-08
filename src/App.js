import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import CodeTranslatorDemo from './components/CodeTranslatorDemo';

// Lazy load components
const FeaturesSection = lazy(() => import('./components/FeaturesSection'));
const CodeExplorer = lazy(() => import('./components/CodeExplorer'));
const DependencyVisualizer = lazy(() => import('./components/DependencyVisualizer'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));
const DocumentationGenerator = lazy(() => import('./components/DocumentationGenerator'));

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen bg-white">
        <header className="bg-white py-6">
          <div className="container mx-auto px-4">
            <nav className="flex justify-between items-center">
              <Link to="/" className="text-xl font-bold text-black">CodeInsight</Link>
              <div className="flex space-x-8">
                <Link to="/" className="text-black hover:text-blue-600 font-medium">Home</Link>
                <Link to="/explorer" className="text-black hover:text-blue-600 font-medium">Code Explorer</Link>
                <Link to="/contact" className="text-black hover:text-blue-600 font-medium">Contact</Link>
              </div>
            </nav>
          </div>
        </header>
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <div className="bg-white text-gray-800">
                <HeroSection />
                <Suspense fallback={<div className="py-8 text-center">Loading...</div>}>
                  <div className="py-8">
                    <FeaturesSection />
                  </div>
                </Suspense>
              </div>
            } />
            
            <Route path="/explorer" element={
              <Suspense fallback={<div className="py-8 text-center">Loading code explorer...</div>}>
                <CodeExplorer />
              </Suspense>
            } />
            
            <Route path="/visualizer" element={
              <Suspense fallback={<div className="py-8 text-center">Loading visualizer...</div>}>
                <DependencyVisualizer />
              </Suspense>
            } />
            
            <Route path="/contact" element={
              <Suspense fallback={<div className="py-8 text-center">Loading...</div>}>
                <ContactSection />
              </Suspense>
            } />
            
            <Route path="/documentation" element={
              <Suspense fallback={<div className="py-8 text-center">Loading documentation generator...</div>}>
                <DocumentationGenerator />
              </Suspense>
            } />
          </Routes>
        </main>
        
        <Suspense fallback={<div className="py-4 text-center">Loading footer...</div>}>
          <Footer />
        </Suspense>

        {/* Code Translator Demo Component */}
        <div className="bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <CodeTranslatorDemo />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
