import { motion } from 'framer-motion';

const technologies = [
  "JavaScript (ES6+)",
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "Tailwind CSS",
];

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-slate-100 mb-12"
        >
          <span className="text-primary">01.</span> About Me
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 space-y-4"
          >
            <p>
              Hello! My name is Tesfaye Kelbesa and I enjoy creating things that live on the internet. 
              My interest in web development started back in 2020 when I decided to try editing 
              custom Tumblr themes — turns out hacking together HTML & CSS is pretty fun!
            </p>
            <p>
              Fast-forward to today, and I've had the privilege of working at an advertising agency, 
              a start-up, and a huge corporation. My main focus these days is building accessible, 
              inclusive products and digital experiences.
            </p>
            <p>
              Here are a few technologies I've been working with recently:
            </p>
            <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
              {technologies.map((tech, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center text-primary group cursor-default"
                >
                  <span className="mr-2 transition-transform group-hover:translate-x-1">▹</span>
                  <span className="group-hover:text-primary/80 transition-colors">{tech}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="w-72 h-72 rounded-full border-2 border-primary/30 flex items-center justify-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-64 h-64 rounded-full bg-slate-800 flex items-center justify-center"
                >
                  <span className="text-6xl">👨‍💻</span>
                </motion.div>
              </motion.div>
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-4 border-2 border-primary/20 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
