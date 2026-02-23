import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// 3D UI Fly-Through Transition - Creative Developer Style
const PageTransition = ({ children }) => {
  const location = useLocation();

  // 12 organized rectangular slices (4x3 grid)
  const COLS = 4;
  const ROWS = 3;
  const SLICE_COUNT = COLS * ROWS;

  // Calculate tunnel delay - center slices move first
  const getTunnelDelay = (index) => {
    const row = Math.floor(index / COLS);
    const col = index % COLS;
    const centerX = (COLS - 1) / 2;
    const centerY = (ROWS - 1) / 2;
    const distFromCenter = Math.sqrt(Math.pow(col - centerX, 2) + Math.pow(row - centerY, 2));
    return distFromCenter * 0.06;
  };

  const getSliceStyle = (index) => {
    const row = Math.floor(index / COLS);
    const col = index % COLS;
    const delay = getTunnelDelay(index);
    
    return {
      position: 'absolute',
      width: `${100 / COLS}%`,
      height: `${100 / ROWS}%`,
      left: `${col * (100 / COLS)}%`,
      top: `${row * (100 / ROWS)}%`,
      perspective: '1200px',
      transformStyle: 'preserve-3d',
      transitionDelay: `${delay}s`,
    };
  };

  // Exit slices - fly toward camera and fade out (tunnel effect)
  const exitSliceVariants = {
    initial: { 
      opacity: 1, 
      scale: 1, 
      z: 0,
      rotateX: 0,
      rotateY: 0,
      filter: 'blur(0px) brightness(1)',
    },
    animate: (index) => {
      const row = Math.floor(index / COLS);
      const col = index % COLS;
      const rotateX = (row - 1) * 8;
      const rotateY = (col - 1.5) * 5;
      
      return {
        opacity: 0,
        scale: 2.5,
        z: 1000,
        rotateX,
        rotateY,
        filter: 'blur(6px) brightness(1.5)',
        transition: {
          duration: 1,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      };
    },
  };

  // Enter variants - new screen comes from far away
  const enterContentVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.7,
      z: -500,
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      z: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="w-full h-full relative overflow-hidden"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          background: '#0a0a0f',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {/* Dark background revealed during transition */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{
            background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)',
          }}
        />

        {/* Exit Slices - fly toward camera (tunnel effect) */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {Array.from({ length: SLICE_COUNT }).map((_, index) => (
            <motion.div
              key={`exit-slice-${index}`}
              style={getSliceStyle(index)}
              initial="initial"
              animate="animate"
              variants={exitSliceVariants}
              custom={index}
            >
              <div 
                className="w-full h-full"
                style={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.03)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* New screen - scales up from far away */}
        <motion.div
          key={`content-${location.pathname}`}
          className="w-full h-full relative z-20"
          variants={enterContentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>

        {/* Depth of field overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0.1] }}
          transition={{ duration: 1.2 }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Tunnel void effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-25"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ duration: 1 }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, #000 0%, transparent 60%)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
