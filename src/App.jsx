import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import AdminAnalytics from './components/admin/AdminAnalytics';
import ChangePassword from './components/admin/ChangePassword';
import { recordVisit } from './utils/visitor';
import scrollToSection from './utils/scrollToSection';

// Public Portfolio Sections with Page Transition
const HomePage = () => (
  <>
    <Hero />
    <About part="work" />
    <Projects />
    <About part="about" />
    <div id="contact" className="portfolio-snap-panel portfolio-contact-panel">
      <Contact />
      <Footer />
    </div>
  </>
);

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

  useEffect(() => {
    if (pathname !== '/') return undefined;

    const sectionIds = ['home', 'experience', 'skills', 'services', 'projects', 'about', 'contact'];
    let isMovingToSection = false;
    let unlockTimer;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchSectionAtStart;

    const getCurrentSection = () => {
      const marker = window.innerHeight * 0.3;
      return sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= marker && bounds.bottom > marker;
        });
    };

    const moveToAdjacentSection = (direction, section = getCurrentSection()) => {
      if (isMovingToSection || !section) return false;

      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);
      const currentIndex = sections.indexOf(section);
      const nextSection = sections[currentIndex + direction];
      if (!nextSection) return false;

      const bounds = section.getBoundingClientRect();
      const reachedBoundary = direction > 0
        ? bounds.bottom <= window.innerHeight + 24
        : bounds.top >= -100;
      if (!reachedBoundary) return false;

      isMovingToSection = true;
      scrollToSection(nextSection);
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        isMovingToSection = false;
      }, 900);
      return true;
    };

    const handleWheel = (event) => {
      if (event.ctrlKey || event.deltaY === 0) return;
      if (moveToAdjacentSection(Math.sign(event.deltaY))) event.preventDefault();
    };

    const handleTouchStart = (event) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchSectionAtStart = getCurrentSection();
    };

    const handleTouchEnd = (event) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touchStartY - touch.clientY;
      if (Math.abs(deltaY) < 55 || Math.abs(deltaY) <= Math.abs(deltaX)) return;
      moveToAdjacentSection(Math.sign(deltaY), touchSectionAtStart);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.clearTimeout(unlockTimer);
    };
  }, [pathname]);

  return null;
};

// Public Portfolio Layout
const PortfolioLayout = ({ children }) => {
  const { data } = usePortfolio();
  const { pathname, hash } = useLocation();
  const isDark = data.theme === 'dark';

  useEffect(() => {
    // Apply theme class to body
    document.body.classList.toggle('light', !isDark);
    document.body.classList.add('portfolio-page');
    return () => document.body.classList.remove('portfolio-page');
  }, [isDark]);

  useEffect(() => {
    document.documentElement.classList.toggle('portfolio-snap', pathname === '/');
    return () => document.documentElement.classList.remove('portfolio-snap');
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') return undefined;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    const frameId = hash
      ? undefined
      : window.requestAnimationFrame(() => window.scrollTo(0, 0));

    return () => {
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [pathname, hash]);

  return (
    <div className="portfolio-layout min-h-screen relative pb-20 md:pb-0">
      <ThreeBackground />
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

// Scroll to hash target when navigating (e.g. /#projects)
const ScrollToHash = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
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
