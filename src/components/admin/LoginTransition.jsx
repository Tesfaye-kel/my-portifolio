import { motion, AnimatePresence } from 'framer-motion';

const LoginTransition = ({ isActive }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '0%' }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e1e4a 100%)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Animated Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            <motion.div
              style={{
                width: 80,
                height: 80,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 60px rgba(59, 130, 246, 0.4)',
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'white',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Welcome Back
            </motion.h2>
            
            {/* Loading Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{
                height: 4,
                background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                borderRadius: 2,
              }}
            />
          </motion.div>
          
          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.2 }}
            style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: '#3b82f6',
              filter: 'blur(100px)',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '10%',
              width: 250,
              height: 250,
              borderRadius: '50%',
              background: '#8b5cf6',
              filter: 'blur(80px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginTransition;
