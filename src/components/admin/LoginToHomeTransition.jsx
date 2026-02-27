import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Special 3D Sweep Transition - Left Bottom to Right Bottom
const LoginToHomeTransition = ({ children, isActive }) => {
  const location = useLocation();

  // Create diagonal sweep panels (8 panels going from left-bottom to right-top)
  const panels = [
    { id: 0, startX: '-100%', startY: '100%', endX: '0%', endY: '0%', delay: 0 },
    { id: 1, startX: '-100%', startY: '100%', endX: '0%', endY: '0%', delay: 0.1 },
    { id: 2, startX: '-100%', startY: '100%', endX: '0%', endY: '0%', delay: 0.15 },
    { id: 3, startX: '-100%', startY: '100%', endX: '0%', endY: '0%', delay: 0.2 },
  ];

  return (
    <div 
      className="relative w-full h-full overflow-hidden" 
      style={{ perspective: '2500px' }}
    >
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key="login-to-home-transition"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="absolute inset-0 z-50"
          >
            {/* Diagonal sweep panels from left-bottom to right-top */}
            {panels.map((panel) => (
              <motion.div
                key={panel.id}
                initial={{ 
                  x: panel.startX, 
                  y: panel.startY,
                  rotateX: 60,
                  rotateY: -30,
                  scale: 0.8,
                  opacity: 1
                }}
                animate={{ 
                  x: panel.endX, 
                  y: panel.endY,
                  rotateX: 0,
                  rotateY: 0,
                  scale: 1,
                  opacity: 0
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: panel.delay,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1e4a 100%)',
                  clipPath: `polygon(${
                    panel.id === 0 ? '0% 75%' : 
                    panel.id === 1 ? '25% 100%' : 
                    panel.id === 2 ? '50% 100%' : 
                    '75% 100%'
                  }, ${
                    panel.id === 0 ? '25% 75%' : 
                    panel.id === 1 ? '50% 100%' : 
                    panel.id === 2 ? '75% 100%' : 
                    '100% 100%'
                  }, ${
                    panel.id === 0 ? '25% 100%' : 
                    panel.id === 1 ? '50% 100%' : 
                    panel.id === 2 ? '75% 100%' : 
                    '100% 100%'
                  }, ${
                    panel.id === 0 ? '0% 100%' : 
                    panel.id === 1 ? '25% 100%' : 
                    panel.id === 2 ? '50% 100%' : 
                    '75% 100%'
                  })`,
                }}
              >
                {/* Glowing edge effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: panel.delay + 0.3 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)',
                  }}
                />
                
                {/* Animated particles */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    delay: panel.delay + 0.2,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                  style={{
                    position: 'absolute',
                    top: '20%',
                    left: '30%',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: '#3b82f6',
                    boxShadow: '0 0 10px #3b82f6, 0 0 20px #3b82f6',
                  }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 1.2, 
                    delay: panel.delay + 0.4,
                    repeat: Infinity,
                    repeatDelay: 0.3
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '30%',
                    right: '20%',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#8b5cf6',
                    boxShadow: '0 0 10px #8b5cf6, 0 0 20px #8b5cf6',
                  }}
                />
              </motion.div>
            ))}

            {/* Sweep line animation */}
            <motion.div
              initial={{ 
                x: '-100%',
                y: '100%',
              }}
              animate={{ 
                x: '200%',
                y: '-100%',
              }}
              transition={{ 
                duration: 1.5, 
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '200%',
                height: '200%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.4) 30%, rgba(139, 92, 246, 0.4) 70%, transparent 100%)',
                transform: 'rotate(45deg)',
                transformOrigin: 'left bottom',
              }}
            />

            {/* Grid lines for 3D depth effect */}
            <svg 
              className="absolute inset-0 w-full h-full"
              style={{ opacity: 0.1 }}
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </motion.div>
        )}

        {/* Content that appears after transition */}
        <motion.div
          key={`content-${location.pathname}`}
          initial={{ 
            opacity: 0,
            scale: 0.9,
            y: 50
          }}
          animate={{ 
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { 
              delay: isActive ? 1.0 : 0, 
              duration: 0.6, 
              ease: "easeOut" 
            }
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginToHomeTransition;
