import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

// Public Portfolio Sections with Page Transition
const HomePage = () => (
  <PageTransition>
    <Hero />
  </PageTransition>
);

const AboutPage = () => (
  <PageTransition>
    <About />
  </PageTransition>
);

const ProjectsPage = () => (
  <PageTransition>
    <Projects />
  </PageTransition>
);

const ContactPage = () => (
  <PageTransition>
    <Contact />
  </PageTransition>
);

// Public Portfolio Layout
const PortfolioLayout = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      <ThreeBackground />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  const { isAdmin, login } = usePortfolio();

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route - accessible when not authenticated */}
        <Route 
          path="/login" 
          element={!isAdmin ? <Login onLogin={login} /> : <Navigate to="/" replace />} 
        />
        
        {/* Public Portfolio Routes - requires authentication */}
        <Route 
          path="/" 
          element={isAdmin ? <PortfolioLayout><Hero /></PortfolioLayout> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/about" 
          element={isAdmin ? <PortfolioLayout><AboutPage /></PortfolioLayout> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/projects" 
          element={isAdmin ? <PortfolioLayout><ProjectsPage /></PortfolioLayout> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/contact" 
          element={isAdmin ? <PortfolioLayout><ContactPage /></PortfolioLayout> : <Navigate to="/login" replace />} 
        />
        
        {/* Protected Admin Routes - requires authentication */}
        <Route 
          path="/admin" 
          element={isAdmin ? <AdminLayout /> : <Navigate to="/login" replace />}
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
        
        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
