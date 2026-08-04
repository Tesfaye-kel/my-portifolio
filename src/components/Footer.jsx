import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Facebook, Mail, Heart, Code2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Tesfaye-kel', icon: <Github size={18} /> },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: <Linkedin size={18} /> },
    { name: 'Twitter', url: 'https://x.com/tesftesfish', icon: <Twitter size={18} /> },
    { name: 'Facebook', url: 'https://web.facebook.com/profile.php?id=61558584585875', icon: <Facebook size={18} /> },
    { name: 'Email', url: 'mailto:tesfayekelbesa912@gmail.com', icon: <Mail size={18} /> }
  ];

  return (
    <footer className="relative py-12 border-t border-[#233554]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="Home">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/30 group-hover:bg-primary/20 transition-all">
              <Code2 size={20} className="text-primary" />
            </div>
            <span className="font-mono font-bold text-primary">{'<TK />'}</span>
          </Link>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#112240]/50 border border-[#233554]/50 text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {['About', 'Experience', 'Skills', 'Projects', 'Services', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-slate-500 hover:text-primary transition-colors font-mono"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-slate-500 text-sm font-mono">
              Built with <span className="text-primary">React</span> & <span className="text-primary">Tailwind CSS</span>
            </p>
            <p className="text-slate-600 text-xs mt-2 flex items-center justify-center gap-1">
              © {currentYear} Tesfaye Kelbesa. All rights reserved.
              <Heart size={12} className="text-primary inline" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;