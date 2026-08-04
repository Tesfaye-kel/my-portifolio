import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { usePortfolio } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';

 // Admin Components
import Login from './components/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ProfileSettings from './components/admin/ProfileSettings';
import SocialLinks from './components/admin/SocialLinks';
import HeroSettings from './components/admin/HeroSettings';
import AboutSettings from './components/admin/AboutSettings';
import ProjectsManager from './components/admin/ProjectsManager';
import SkillsManager from './components/admin/SkillsManager';
import GalleryManager from './components/admin/GalleryManager';
import Messages from './components/admin/Messages';
import PageTransition from './components/admin/PageTransition';
import ProjectDetail from './components/ProjectDetail';

// Public Portfolio Sections with Page Transition
const HomePage = () => (
  <PageTransition>
    <Hero />
    <About />
    <Projects />
    <Contact />
  </PageTransition>
);

const ProjectDetailPage = () => (
  <PageTransition>
    <ProjectDetail />
  </PageTransition>
);

// Public Portfolio Layout
const PortfolioLayout = ({ children }) => {
  const { data } = usePortfolio();
  const isDark = data.theme === 'dark';

  useEffect(() => {
    // Apply theme class to body
    document.body.classList.toggle('light', !isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen relative">
      <style>{`html { scroll-behavior: smooth; }`}</style>
      <ThreeBackground />
      <div className="noise-overlay" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  const { isAdmin, login } = usePortfolio();
  
  // Use '/' for Vercel, '/my-portifolio/' for GitHub Pages
  const basename = import.meta.env.VITE_BASE_URL || '/my-portifolio';

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {/* Public Portfolio Routes */}
        <Route 
          path="/" 
          element={<PortfolioLayout><HomePage /></PortfolioLayout>} 
        />
        <Route 
          path="/project/:id" 
          element={<PortfolioLayout><ProjectDetailPage /></PortfolioLayout>} 
        />
        
        {/* Admin Login - Only accessible via direct /admin URL, no public links point here */}
        <Route 
          path="/admin" 
          element={isAdmin ? <AdminLayout /> : <Login onLogin={login} />}
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="profile" element={<PageTransition><ProfileSettings /></PageTransition>} />
          <Route path="social" element={<PageTransition><SocialLinks /></PageTransition>} />
          <Route path="hero" element={<PageTransition><HeroSettings /></PageTransition>} />
          <Route path="about" element={<PageTransition><AboutSettings /></PageTransition>} />
          <Route path="projects" element={<PageTransition><ProjectsManager /></PageTransition>} />
          <Route path="skills" element={<PageTransition><SkillsManager /></PageTransition>} />
          <Route path="gallery" element={<PageTransition><GalleryManager /></PageTransition>} />
          <Route path="messages" element={<PageTransition><Messages /></PageTransition>} />
        </Route>
        
        {/* Catch all - redirect to home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
