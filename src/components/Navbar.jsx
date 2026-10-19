import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, Sun, Moon, Home,
  User, Briefcase, Wrench, FolderGit2, 
  Sparkles, Mail 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home', icon: <Home size={16} /> },
  { name: 'About', href: '#about', id: 'about', icon: <User size={16} /> },
  { name: 'Experience', mobileName: 'Work', href: '#experience', id: 'experience', icon: <Briefcase size={16} /> },
  { name: 'Skills', href: '#skills', id: 'skills', icon: <Wrench size={16} /> },
  { name: 'Services', href: '#services', id: 'services', icon: <Sparkles size={16} /> },
  { name: 'Projects', href: '#projects', id: 'projects', icon: <FolderGit2 size={16} /> },
  { name: 'Contact', href: '#contact', id: 'contact', icon: <Mail size={16} /> },
];
const mobileNavLinks = navLinks.filter((link) => link.id !== 'services');

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { data, toggleTheme } = usePortfolio();
  const isDark = data.theme === 'dark';
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScrollDetection = () => {
      const sections = navLinks
        .map((link) => ({ id: link.id, element: document.getElementById(link.id) }))
        .filter((s) => s.element);

      if (sections.length === 0) return;

      const scrollY = window.scrollY + 120; // Offset for navbar height

      // Find the section closest to the top of the viewport
      let closestSection = sections[0];
      let closestDistance = Math.abs(scrollY - closestSection.element.offsetTop);

      sections.forEach((section) => {
        const distance = Math.abs(scrollY - section.element.offsetTop);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = section;
        }
      });

      setActiveSection(closestSection.id);
    };

    window.addEventListener('scroll', handleScrollDetection, { passive: true });
    handleScrollDetection(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScrollDetection);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.startsWith('#') ? href.slice(1) : href;
    const target = document.getElementById(targetId);

    if (!target) {
      if (href.startsWith('#')) {
        window.history.pushState(null, '', `${window.location.pathname}${href}`);
      }
      return;
    }

    const offset = 90;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.history.pushState(null, '', `${window.location.pathname}${href}`);
    setActiveSection(targetId);

    requestAnimationFrame(() => {
      window.scrollTo({ top, behavior: 'smooth' });
    });

    setTimeout(() => {
      const finalTarget = document.getElementById(targetId);
      if (finalTarget) {
        finalTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      window.location.hash = targetId;
    }, 50);
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 max-md:top-auto max-md:bottom-0 max-md:border-t max-md:border-b-0 max-md:border-[#233554]/60 max-md:bg-[#0a192f]/95 max-md:pb-[env(safe-area-inset-bottom)] max-md:backdrop-blur-xl ${
        scrolled 
          ? 'bg-[#0a192f]/80 backdrop-blur-xl border-b border-[#233554]/50 shadow-lg' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:grid md:grid-cols-3 md:items-center md:h-20">
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
        </div>

        <div className="md:hidden grid grid-cols-7 items-center gap-0.5 px-1 py-2">
          {mobileNavLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-label={link.name}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-2 text-[9px] font-semibold transition-colors duration-300 ${
                activeSection === link.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-400 hover:bg-primary/5 hover:text-primary'
              }`}
            >
              {link.icon}
              <span>{link.mobileName || link.name}</span>
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-2 text-[9px] font-semibold text-slate-400 transition-colors hover:bg-primary/5 hover:text-primary"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            <span>Theme</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;