import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { usePortfolio } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAdmin } = usePortfolio();
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Public Portfolio Component
const Portfolio = () => {
  return (
    <div className="bg-navy min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Portfolio */}
        <Route path="/" element={<Portfolio />} />
        
        {/* Admin Login - Public Route */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Protected Admin Routes with Nested Routing */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
