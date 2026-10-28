import { useState, useEffect } from 'react';
import scrollToSection from '../utils/scrollToSection';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home', icon: <path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z" /> },
  { name: 'Experience', href: '#experience', id: 'experience', icon: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V4h6v3" /></> },
  { name: 'Skills', href: '#skills', id: 'skills', icon: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /> },
  { name: 'Projects', href: '#projects', id: 'projects', icon: <path d="M3 6a2 2 0 012-2h4l2 3h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" /> },
  { name: 'About', href: '#about', id: 'about', icon: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.01" /></> },
  { name: 'Contact', href: '#contact', id: 'contact', icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></> },
];
const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
      if (visibleSections[0]) setActiveSection(visibleSections[0].target.id);
    }, {
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0,
    });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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

    window.history.pushState(null, '', `${window.location.pathname}${href}`);
    setActiveSection(targetId);
    scrollToSection(target, 'instant');
  };

  return (
    <nav className="pillnav" aria-label="Main">
      {navLinks.map((link) => (
        <a
          key={link.id}
          href={link.href}
          aria-label={link.name}
          aria-current={activeSection === link.id ? 'page' : undefined}
          onClick={(e) => handleNavClick(e, link.href)}
          className={activeSection === link.id ? 'is-active' : ''}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">{link.icon}</svg>
          <span className="nav-label">{link.name}</span>
        </a>
      ))}
    </nav>
  );
};

export default Navbar;