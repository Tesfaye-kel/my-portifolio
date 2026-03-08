import myProfileImage from '../../me.jpg';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { useState, useEffect } from 'react';

// --- High Quality Social Icons (SVG) ---
const GitHubIcon = () => (
  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
);

const LinkedInIcon = () => (
  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const FacebookIcon = () => (
  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const TwitterIcon = () => (
  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
);

// --- Typing Effect Component ---
const TypewriterEffect = ({ texts, speed = 100, deleteSpeed = 50, delayBetween = 2000 }) => {
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

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
};

// --- Main Hero Component ---
const Hero = () => {
  const { data } = usePortfolio();
  const { hero, profile } = data;
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const titles = hero?.title ? [hero.title] : ['Full Stack Developer', 'Problem Solver'];

  const socialLinks = [
    { icon: <GitHubIcon />, url: 'https://github.com/Tesfaye-kel', label: 'GitHub' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FacebookIcon />, url: 'https://web.facebook.com/profile.php?  id=61558584585875', label: 'Facebook' },
    { icon: <TwitterIcon />, url: 'https://x.com/tesftesfish', label: 'Twitter' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background Decor */}
      <motion.div style={{ y: y1 }} className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <motion.div style={{ y: y2 }} className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Content (Text) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <p className="text-primary font-mono text-lg mb-4">{hero?.greeting || 'Hello, I am'}</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-2">
              <span className="bg-gradient-to-r from-slate-100 via-primary to-slate-100 bg-clip-text text-transparent">
                {profile?.name || 'Tesfaye'}
              </span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-400 mb-6 h-12">
              <TypewriterEffect texts={titles} />
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#contact" className="bg-primary text-navy px-8 py-4 rounded-md text-lg font-mono font-semibold transition-transform active:scale-95">Get in Touch</a>
            </div>
          </motion.div>
          
          {/* profile picture */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center justify-center order-1 md:order-2"
          >
            {/* Circular Profile Picture */}
            <div className="relative mb-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl"
              >
                <img 
                  src={myProfileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Social Icons Centered Below Pic */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-10"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, color: '#64ffda' }} // Color: Teal/Primary
                  className="text-slate-400 transition-colors duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;