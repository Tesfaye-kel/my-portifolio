import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Code2, Sun, Moon, 
  User, Briefcase, Wrench, FolderGit2, 
  Sparkles, Mail 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const { data, toggleTheme } = usePortfolio();
  const isDark = data.theme === 'dark';

  const navLinks = [
    { name: 'About', href: '#about', id: 'about', icon: <User size={16} /> },
    { name: 'Experience', href: '#experience', id: 'experience', icon: <Briefcase size={16} /> },
    { name: 'Skills', href: '#skills', id: 'skills', icon: <Wrench size={16} /> },
    { name: 'Projects', href: '#projects', id: 'projects', icon: <FolderGit2 size={16} /> },
    { name: 'Services', href: '#services', id: 'services', icon: <Sparkles size={16} /> },
    { name: 'Contact', href: '#contact', id: 'contact', icon: <Mail size={16} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = navLinks.map(l => l.id);
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      window.location.href = `/${href}`;
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0a192f]/80 backdrop-blur-xl border-b border-[#233554]/50 shadow-lg' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="group flex items-center gap-3 justify-self-start"
            aria-label="Home"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-2 rounded-lg bg-primary/10 border border-primary/30 group-hover:bg-primary/20 transition-all duration-300">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
            </div>
            <span className="hidden sm:block font-mono font-bold text-primary text-lg tracking-tight">
              {'<TK />'}
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#112240]/40 border border-[#233554]/30 backdrop-blur-md">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group flex items-center gap-2 rounded-full ${
                    activeSection === link.id 
                      ? 'text-primary bg-primary/10' 
                      : 'text-slate-400 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <span className={`transition-all duration-300 ${
                    activeSection === link.id 
                      ? 'text-primary opacity-100' 
                      : 'text-slate-500 opacity-60 group-hover:text-primary group-hover:opacity-100'
                  }`}>
                    {link.icon}
                  </span>
                  {link.name}
                  <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                    activeSection === link.id ? 'w-6' : 'w-0 group-hover:w-6'
                  }`} />
                </a>
              ))}
            </div>
          </div>

          {/* Theme Toggle - Right */}
          <div className="hidden md:flex items-center justify-self-end">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10 border border-[#233554]/30 bg-[#112240]/40 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2 justify-self-end">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#0a192f]/95 backdrop-blur-xl border-b border-[#233554]/50"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300 ${
                    activeSection === link.id 
                      ? 'text-primary bg-primary/10' 
                      : 'text-slate-400 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <span className={`transition-all duration-300 ${
                    activeSection === link.id 
                      ? 'text-primary' 
                      : 'text-slate-500 group-hover:text-primary'
                  }`}>
                    {link.icon}
                  </span>
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;