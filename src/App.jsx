import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { usePortfolio } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PalettePicker from './components/PalettePicker';
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
import AdminAnalytics from './components/admin/AdminAnalytics';
import ChangePassword from './components/admin/ChangePassword';
import { recordVisit } from './utils/visitor';
import scrollToSection from './utils/scrollToSection';

// Public Portfolio Sections with Page Transition
const HomePage = ({ activeSection, onNavigate }) => {
  if (activeSection === 'home') return <Hero onNavigate={onNavigate} />;
  if (activeSection === 'experience') return <About part="experience" />;
  if (activeSection === 'skills') return <About part="skills" />;
  if (activeSection === 'services') return <About part="services" />;
  if (activeSection === 'projects') return <Projects />;
  if (activeSection === 'about') return <About part="about" />;

  return (
    <div id="contact" className="portfolio-contact-panel">
      <Contact />
      <Footer />
    </div>
  );
};

const ProjectDetailPage = () => (
  <PageTransition>
    <ProjectDetail />
    <Footer />
  </PageTransition>
);

const SmoothScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') return undefined;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
};

// Public Portfolio Layout
const PortfolioLayout = ({ children }) => {
  const { data } = usePortfolio();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const sectionFromHash = hash.slice(1);
  const activeSection = ['home', 'experience', 'skills', 'services', 'projects', 'about', 'contact'].includes(sectionFromHash)
    ? sectionFromHash
    : 'home';
  const isDark = data.theme === 'dark';

  useEffect(() => {
    // Apply theme class to body
    document.body.classList.toggle('light', !isDark);
    document.body.classList.add('portfolio-page');
    return () => document.body.classList.remove('portfolio-page');
  }, [isDark]);

  const handleSectionChange = (section) => {
    navigate({ pathname: '/', hash: `#${section}` });
  };

  return (
    <div className={`portfolio-layout min-h-screen relative ${pathname === '/' ? 'portfolio-workspace' : 'pb-20 md:pb-0'}`}>
      <ThreeBackground />
      {pathname === '/'
        ? (
          <div className="portfolio-workspace-shell">
            <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
            <main className="portfolio-workspace-main">
              <div className="portfolio-workspace-panel" key={activeSection}>
                <HomePage activeSection={activeSection} onNavigate={handleSectionChange} />
              </div>
            </main>
            <PalettePicker />
          </div>
        )
        : (
          <>
            <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
            <main>{children}</main>
          </>
        )}
    </div>
  );
};

// Scroll to hash target when navigating (e.g. /#projects)
const ScrollToHash = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname !== '/' && location.hash) {
      const targetId = location.hash.replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        setTimeout(() => {
          scrollToSection(target);
        }, 100);
      }
    }
  }, [location]);

  return null;
};

function App() {
  const { isAdmin } = usePortfolio();
  
  // Simple callback for Login component - context login already sets isAdmin
  const handleLogin = () => {
    // isAdmin is already set by context login function
  };
  
  // Use Vite's BASE_URL (matches vite.config.js base) - works for dev and production
  const basename = import.meta.env.BASE_URL || '/';

  // Record visitor visit on page load
  useEffect(() => {
    recordVisit();
  }, []);

  return (
    <BrowserRouter basename={basename}>
      <SmoothScroll />
      <ScrollToHash />
      <Routes>
        {/* Public Portfolio Routes */}
        <Route path="/" element={<PortfolioLayout />} />
        <Route 
          path="/project/:id" 
          element={<PortfolioLayout><ProjectDetailPage /></PortfolioLayout>} 
        />
        
        {/* Admin Login - Only accessible via direct /admin URL, no public links point here */}
        <Route 
          path="/admin" 
          element={isAdmin ? <AdminLayout /> : <Login onLogin={handleLogin} />}
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
          <Route path="analytics" element={<PageTransition><AdminAnalytics /></PageTransition>} />
          <Route path="password" element={<PageTransition><ChangePassword /></PageTransition>} />
        </Route>
        
        {/* Catch all - redirect to home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
