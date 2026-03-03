import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-[#0f172a] text-white selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <div className="max-w-6xl mx-auto px-4">
        <Projects />
        <Skills />
        <Contact />
      </div>
      <footer className="py-10 text-center border-t border-slate-800 text-gray-500">
        <p>© 2026 Cherinet Habtamu. Built with MERN Stack.</p>
      </footer>
    </div>
  );
}
export default App;