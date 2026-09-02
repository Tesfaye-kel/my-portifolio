import { motion, useScroll, useTransform } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowDown, ArrowRight, Download, ExternalLink, Twitter, Facebook, Send } from 'lucide-react';
import myProfileImage from '../../mee.jpg';

// --- Typewriter Effect ---
const TypewriterEffect = ({ texts, speed = 80, deleteSpeed = 40, delayBetween = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delayBetween);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [displayText, textIndex, isDeleting, texts, speed, deleteSpeed, delayBetween]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
};

// --- Magnetic Button ---
const MagneticButton = ({ children, href, className = '', onClick }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-btn ${className}`}
      style={{ transition: 'transform 0.3s ease' }}
    >
      {children}
    </a>
  );
};

// --- Floating Tech Badges ---
const FloatingBadge = ({ icon, label, position, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5, type: 'spring' }}
    className={`absolute ${position} hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#112240]/80 backdrop-blur-md border border-[#233554]/50 shadow-lg`}
  >
    <span className="text-primary">{icon}</span>
    <span className="text-xs font-mono text-slate-300">{label}</span>
  </motion.div>
);

const Hero = () => {
  const { data } = usePortfolio();
  const { hero, profile } = data;
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const titles = ['Full Stack Developer', 'MERN Stack Engineer', 'Problem Solver', 'UI/UX Enthusiast'];

  const socialLinks = [
    { icon: <Github size={20} />, url: 'https://github.com/Tesfaye-kel', label: 'GitHub' },
    { icon: <Linkedin size={20} />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Facebook size={20} />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <Send size={20} />, url: 'https://t.me', label: 'Telegram' },
    { icon: <Mail size={20} />, url: 'mailto:tesfayekelbesa912@gmail.com', label: 'Email' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Decor */}
      <motion.div style={{ y: y1, opacity }} className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <motion.div style={{ y: y2, opacity }} className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Mobile-only Story Quote - shown at the very top, replacing the profile pic's usual top spot */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:hidden order-0"
          >
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-primary/60 max-w-[70px]" />
              <span className="text-primary font-mono text-xs sm:text-sm tracking-[0.25em] uppercase">My Why</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/40 to-primary/60 max-w-[70px]" />
            </div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="flex justify-center mb-3"
            >
              <div className="flex items-center justify-center gap-2 text-primary/90">
                <ArrowDown size={14} />
              </div>
            </motion.div>
            <div className="relative max-w-md mx-auto px-6 py-6 rounded-2xl bg-[#112240]/40 border border-[#233554]/50">
              <span className="absolute top-3 left-4 text-2xl text-primary/20 font-serif leading-none select-none">"</span>
              <p className="text-slate-300/90 text-sm sm:text-base leading-loose text-left max-w-[90%] mx-auto">
                We are all given different beginnings. Some are easy, some are uncertain, and some force us to grow before we are ready. I chose to see mine not as limitations, but as materials—things I could learn from, shape, and turn into something meaningful.
              </p>
              <span className="absolute bottom-3 right-4 text-2xl text-primary/20 font-serif leading-none select-none">"</span>
            </div>
          </motion.div>

          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Availability Status - at the very top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-xs font-mono text-primary">Available for opportunities</span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-primary font-mono text-lg mb-2"
            >
              {hero?.greeting || 'Hello, I am'}
            </motion.p>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-2"
            >
              <span className="gradient-text">
                {profile?.name || 'Tesfaye Kelbesa'}
              </span>
            </motion.h1>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl md:text-3xl font-bold text-slate-400 mb-3 h-10"
            >
              <TypewriterEffect texts={titles} />
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-slate-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-4"
            >
              {hero?.description || 'Building scalable digital experiences where engineering meets design. Specializing in the MERN stack with a passion for clean, efficient, and user-friendly applications.'}
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-4"
            >
              <MagneticButton href="#contact" className="bg-primary text-[#0a192f] border-primary">
                Get in Touch
                <ExternalLink size={16} />
              </MagneticButton>
              <MagneticButton href="#projects">
                View My Work
                <ArrowDown size={16} />
              </MagneticButton>
              <MagneticButton href="#" className="border-slate-500 text-slate-400 hover:border-primary hover:text-primary">
                <Download size={16} />
                Resume
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center justify-between w-full gap-2 sm:gap-4 mb-4"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 sm:p-3 rounded-lg bg-[#112240]/50 border border-[#233554]/50 text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Words I Live By */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-4 text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-primary/60 max-w-[80px]" />
                <span className="text-primary font-mono text-sm tracking-widest uppercase">Words I Live By</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/40 to-primary/60 max-w-[80px]" />
              </div>
              <div className="relative max-w-xl mx-auto px-5 py-4 rounded-2xl bg-[#112240]/40 border border-[#233554]/50">
                <span className="absolute -top-4 left-4 text-5xl text-primary/30 font-serif">"</span>
                <p className="text-slate-300 text-sm sm:text-base italic leading-relaxed">
                  Embrace what life gives you, then Try to make something beautiful from it.
                </p>
                <span className="absolute -bottom-6 right-4 text-5xl text-primary/30 font-serif">"</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right - Profile Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center justify-center order-1 lg:order-2"
          >
            <div className="relative mb-4">
              <div className="absolute inset-[-18px] rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-[#1d3557]/30 via-[#0a192f]/10 to-[#020817]/40 blur-sm" />
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border border-[#233554]/70 bg-[radial-gradient(circle_at_30%_30%,rgba(96,165,250,0.18),rgba(17,34,64,0.92)_38%,rgba(2,6,23,1)_100%)] p-2 shadow-[0_0_0_1px_rgba(148,163,184,0.08),0_25px_60px_-18px_rgba(2,6,23,0.95),0_0_30px_rgba(96,165,250,0.18)]"
              >
                <div className="relative w-full h-full overflow-hidden rounded-full border border-white/5 bg-[#020817] shadow-inner shadow-[#020817]/80">
                  <img 
                    src={myProfileImage} 
                    alt="Tesfaye Kelbesa - Full Stack Developer" 
                    className="w-full h-full object-cover object-center opacity-95"
                  />
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs font-mono">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;