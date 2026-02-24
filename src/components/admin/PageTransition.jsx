import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// 3D Multi-Plane Fly-Through Transition
const PageTransition = ({ children }) => {
  const location = useLocation();

  // 3x3 Grid (9 tiles)
  const tiles = Array.from({ length: 9 });

  const containerVariants = {
    exit: {
      transition: { staggerChildren: 0.07, staggerDirection: 1 }
    }
  };

  const tileVariants = {
    initial: { z: 0, opacity: 1 },
    exit: (i) => ({
      z: 1500, // Pushes the tiles past the camera
      opacity: 0,
      rotateX: i < 3 ? -25 : i > 5 ? 25 : 0, // Tilts top/bottom rows
      rotateY: i % 3 === 0 ? -25 : i % 3 === 2 ? 25 : 0, // Tilts side columns
      transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] }
    })
  };

  const contentVariants = {
    initial: { z: -1000, scale: 0.8, opacity: 0 },
    animate: { 
      z: 0, 
      scale: 1, 
      opacity: 1, 
      transition: { delay: 0.5, duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden" 
      style={{ perspective: '1200px' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={containerVariants}
          exit="exit"
          className="grid grid-cols-3 grid-rows-3 w-full h-full"
        >
          {tiles.map((_, i) => (
            <motion.div
              key={`tile-${i}`}
              custom={i}
              variants={tileVariants}
              className="relative overflow-hidden border-[0.5px] border-white/10"
              style={{
                background: 'linear-gradient(145deg, #1e1e30 0%, #0a0a15 100%)',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
              }}
            />
          ))}
        </motion.div>

        <motion.div
          key={`content-${location.pathname}`}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
