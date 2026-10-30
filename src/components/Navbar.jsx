const navLinks = [
  { name: 'Home', id: 'home', icon: <path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z" /> },
  { name: 'Experience', id: 'experience', icon: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V4h6v3" /></> },
  { name: 'Skills', id: 'skills', icon: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /> },
  { name: 'Services', id: 'services', icon: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /><circle cx="12" cy="12" r="6" /><path d="M9.5 12l1.7 1.7 3.5-3.5" /></> },
  { name: 'Projects', id: 'projects', icon: <path d="M3 6a2 2 0 012-2h4l2 3h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" /> },
  { name: 'About', id: 'about', icon: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.01" /></> },
  { name: 'Contact', id: 'contact', icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></> },
];

const Navbar = ({ activeSection, onSectionChange }) => (
  <aside className="portfolio-sidebar">
    <a
      href="#home"
      className="portfolio-sidebar-brand"
      onClick={(event) => {
        event.preventDefault();
        onSectionChange('home');
      }}
      aria-label="Go to Home"
    >
      <span className="portfolio-sidebar-monogram">TK</span>
      <span className="portfolio-sidebar-brand-copy">
        <strong>Tesfaye Kelbesa</strong>
        <small>Portfolio / 2026</small>
      </span>
    </a>

    <div className="portfolio-sidebar-caption">WORKSPACE</div>
    <nav className="portfolio-sidebar-nav" aria-label="Portfolio sections">
      {navLinks.map((link, index) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          aria-current={activeSection === link.id ? 'page' : undefined}
          onClick={(event) => {
            event.preventDefault();
            onSectionChange(link.id);
          }}
          className={activeSection === link.id ? 'is-active' : ''}
        >
          <span className="portfolio-sidebar-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">{link.icon}</svg>
          </span>
          <span>{link.name}</span>
          <small>{String(index + 1).padStart(2, '0')}</small>
        </a>
      ))}
    </nav>

    <div className="portfolio-sidebar-footer">
      <span className="portfolio-sidebar-status" />
      <span>Available for opportunities</span>
    </div>
  </aside>
);

export default Navbar;
