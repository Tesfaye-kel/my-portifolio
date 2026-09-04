import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { usePortfolio } from '../context/PortfolioContext';
import { useRef, useState } from 'react';
import { 
  Code2, Database, Server, Wrench, 
  Github, Linkedin, Mail, Phone, 
  ArrowRight, Sparkles, Rocket, Download, BriefcaseBusiness,
  Shield, Zap, Layout, GitBranch,
  Globe, Layers, Cpu, Terminal,
  Star, GitFork, Users, GitCommit,
  Share2, MessageCircle, Eye, ThumbsUp,
  Brain, Coffee, Music, BookOpen, 
  Gamepad2, Camera, Compass, Dumbbell, Plane
} from 'lucide-react';

const baseUrl = import.meta.env.BASE_URL || '/';

// --- Animated Counter ---
const Counter = ({ value, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress > 0.5 && !started) {
      setStarted(true);
      const start = performance.now();
      const animate = (time) => {
        const elapsed = (time - start) / 1000;
        const p = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.floor(eased * value));
        if (p < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  });

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

// --- Section Header ---
const SectionHeader = ({ number, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mb-20 text-center"
  >
    <div className="flex items-center justify-center gap-4 mb-6" style={{ marginLeft: '-0.5px' }}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/40 to-white/60 max-w-[80px]" />
      <h2 className="text-white font-mono text-base tracking-widest uppercase">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/40 to-white/60 max-w-[80px]" />
    </div>
    {subtitle && <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
  </motion.div>
);

// --- Story Section ---
const StorySection = ({ title, tagline, icon, paragraphs, index }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="group relative"
  >
    <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#112240]/60 to-[#0a192f]/60 border border-[#233554]/60 hover:border-primary/40 hover:shadow-[0_0_35px_rgba(100,255,218,0.08)] transition-all duration-300 overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      
      <div className="flex flex-col items-center text-center mb-6 pt-3">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all" />
          <div className="relative p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all">
            {icon}
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">{title}</h3>
        {tagline && (
          <span className="px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary/70 text-xs font-mono tracking-wide">
            {tagline}
          </span>
        )}
        <div className="flex items-center gap-1 mt-4">
          <span className="w-8 h-[2px] bg-primary/40 rounded-full" />
          <span className="w-2 h-2 bg-primary/60 rounded-full" />
          <span className="w-8 h-[2px] bg-primary/40 rounded-full" />
        </div>
      </div>
      <div className="space-y-4 text-left">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-slate-400 leading-relaxed text-[15px]">{para}</p>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- Tech Stack Data ---
const techStack = {
  frontend: {
    icon: <span role="img" aria-label="Computer">🖥️</span>,
    title: 'Frontend',
    color: '#61dafb',
    technologies: [
      { name: 'React', level: 90, desc: 'Component architecture, hooks, state management' },
      { name: 'JavaScript', level: 92, desc: 'ES6+, async patterns, DOM manipulation' },
      { name: 'TypeScript', level: 75, desc: 'Type safety, interfaces, generics' },
      { name: 'Tailwind CSS', level: 88, desc: 'Utility-first styling, responsive design' },
      { name: 'HTML5', level: 95, desc: 'Semantic markup, accessibility' },
      { name: 'CSS3', level: 90, desc: 'Flexbox, Grid, animations, preprocessors' },
    ]
  },
  backend: {
    icon: <span role="img" aria-label="Developer">🧑‍💻</span>,
    title: 'Backend',
    color: '#68a063',
    technologies: [
      { name: 'Node.js', level: 85, desc: 'Event-driven architecture, REST APIs' },
      { name: 'Express', level: 85, desc: 'Middleware, routing, API design' },
      { name: 'REST APIs', level: 88, desc: 'CRUD operations, authentication, validation' },
      { name: 'Go', level: 80, desc: 'Concurrent systems, high-performance services' },
      { name: 'Firebase', level: 85, desc: 'Authentication, real-time data, and cloud services' },
    ]
  },
  database: {
    icon: <span role="img" aria-label="Database">🗄️</span>,
    title: 'Database',
    color: '#4DB33D',
    technologies: [
      { name: 'MongoDB', level: 90, desc: 'NoSQL, Mongoose ODM, aggregation' },
      { name: 'SQL', level: 85, desc: 'Relational queries, schema design' },
      { name: 'PostgreSQL', level: 85, desc: 'Advanced queries, indexing, transactions' },
    ]
  },
  tools: {
    icon: <span role="img" aria-label="Tools">🛠️</span>,
    title: 'Tools',
    color: '#f34f29',
    technologies: [
      { name: 'Git', level: 90, desc: 'Version control, branching, collaboration' },
      { name: 'GitHub', level: 92, desc: 'Repositories, CI/CD, project management' },
      { name: 'VS Code', level: 95, desc: 'Development environment, extensions' },
      { name: 'Docker', level: 70, desc: 'Containerization, deployment' },
      { name: 'Postman', level: 85, desc: 'API testing, documentation' },
      { name: 'Figma', level: 75, desc: 'UI design, prototyping, collaboration' },
    ]
  }
};

// --- Experience Data ---
const experienceData = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance / Personal Projects',
    period: '2026 - Present',
    description: 'Building modern, scalable, and responsive full-stack applications using the MERN stack and related technologies. Focused on developing real-world solutions, implementing real-time features, and creating user-friendly experiences.',
    technologies: ['React.js', 'Node.js', 'TypeScript', 'Express.js', 'MongoDB', 'Firebase', 'Socket.io'],
    achievements: [
      'Built Zenivial Social Network - developed a real-time social media platform with user authentication, profiles, posts, interactions, and real-time communication',
      'Developed Restaurant Management System - created a management platform with Firebase integration for data storage, authentication, and real-time updates',
      'Developed Responsive Web Applications - built multiple modern, responsive applications optimized for desktop, tablet, and mobile devices',
      'Implemented Real-Time Messaging - integrated Socket.io to enable fast and reliable real-time communication between users',
      'Designed RESTful APIs - developed backend APIs using Node.js and Express.js for efficient communication between frontend and database systems',
      'Worked with MongoDB - designed database structures, managed application data, and implemented CRUD operations for full-stack applications',
      'Implemented Authentication & Authorization - added secure user authentication and access-control features across applications',
      'Integrated Third-Party Services - connected external APIs and services to extend application functionality and improve user experience',
      'Focused on Clean & Maintainable Code - followed reusable component patterns and organized project structures to improve scalability and maintainability',
      'Deployed Full-Stack Applications - managed application deployment and configuration for production-ready web applications'
    ]
  },
  {
    role: 'Computer Science Student',
    company: 'University',
    period: '2023 - Present',
    description: 'Pursuing a Bachelor\'s degree in Computer Science with a strong foundation in software development, algorithms, data structures, databases, and object-oriented programming. Actively applying academic knowledge through personal projects, web development, and hackathons.',
    technologies: ['Data Structures', 'Algorithms', 'Database Systems', 'OOP'],
    achievements: [
      'Strong foundation in programming - developed solid problem-solving skills through algorithms, data structures, and software development coursework',
      'Web Application Development - built responsive and user-friendly web applications using modern front-end and back-end technologies',
      'Full-Stack Development - gained hands-on experience developing both front-end interfaces and back-end services',
      'Database Management - worked with relational and NoSQL databases to design, store, and manage application data',
      'Academic Projects - applied theoretical knowledge to practical software development projects and coursework',
      'Hackathon Participation - participated in hackathons and collaborative projects to develop solutions to real-world problems',
      'Continuous Learning - continuously improving technical skills by exploring new technologies, frameworks, and software development practices'
    ]
  }
];

// --- Engineering Principles ---
const engineeringPrinciples = [
  {
    icon: <Layers size={24} />,
    title: 'Architecture',
    description: 'Scalable component structures with clean separation of concerns. Building maintainable codebases that grow with the product.',
    color: '#64ffda'
  },
  {
    icon: <Zap size={24} />,
    title: 'Perfrmance',
    description: 'Optimized interfaces with lazy loading, code splitting, and efficient rendering. Fast load times and smooth interactions.',
    color: '#fbbf24'
  },
  {
    icon: <Shield size={24} />,
    title: 'Securty',
    description: 'Secure APIs with proper authentication, input validation, and environment variable management. Protecting user data.',
    color: '#f87171'
  },
  {
    icon: <Globe size={24} />,
    title: 'Responsive Design',
    description: 'Mobile-first experiences that work flawlessly across all devices. From 320px phones to 4K displays.',
    color: '#60a5fa'
  },
  {
    icon: <GitBranch size={24} />,
    title: 'Maintainability',
    description: 'Clean, reusable code with proper documentation. Easy to understand, modify, and extend.',
    color: '#a78bfa'
  },
  {
    icon: <Cpu size={24} />,
    title: 'Problem Solving',
    description: 'Breaking down complex problems into manageable solutions. Debugging with a systematic approach.',
    color: '#34d399'
  }
];

// --- Services Data ---
const servicesData = [
  {
    icon: <Code2 size={24} />,
    title: 'Full-Stack Development',
    description: 'Building complete, production-ready web applications from frontend interfaces to backend systems and databases. I develop responsive user experiences, robust APIs, authentication systems, and scalable application architectures tailored to each project.',
    technologies: ['React', 'Next.js', 'Node.js', 'Express.js', 'JavaScript', 'TypeScript', 'Go', 'Firebase']
  },
  {
    icon: <Database size={24} />,
    title: 'Database & Data Management',
    description: 'Designing efficient data structures and integrating applications with reliable database systems. I work with both SQL and NoSQL databases, focusing on schema design, relationships, query performance, and data integrity.',
    technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'Mongoose', 'Prisma']
  },
  {
    icon: <Sparkles size={24} />,
    title: 'AI Integration',
    description: 'Building intelligent application features by connecting modern AI models with real-world software. I develop AI workflows, prompt systems, API integrations, and backend logic that turn language models into useful product features.',
    technologies: ['Python', 'OpenAI API', 'Claude API', 'LangChain', 'Prompt Engineering', 'REST APIs']
  },
  {
    icon: <Rocket size={24} />,
    title: 'DevOps & Deployment',
    description: 'Taking applications from development to production with reliable deployment and development workflows. I configure environments, manage source control, deploy applications, and set up the infrastructure needed to keep projects running smoothly.',
    technologies: ['Git', 'GitHub', 'Docker', 'Vercel', 'Render', 'Linux']
  }
];

// --- Personal Story Data ---
const storySections = [
  {
    id: 'beginning',
    title: 'The Beginning',
    icon: <Sparkles size={18} />,
    tagline: 'Where it all started',
    paragraphs: [
      'I grew up in a small town where electricity was limited and technology was far from everyday life. Until Grade 9, my understanding of technology was mostly something I heard about through the radio.',
      'Grade 10 changed that. I began exploring technology firsthand, slowly adapting to it and developing a curiosity that continued to grow.',
      'By the time I entered Haramaya University, technology had become more than something I was learning to use—it had become something I wanted to understand. After my freshman year, I chose Computer Science and began pursuing that curiosity with deeper focus and purpose.',
      'A limited beginning. A growing curiosity. A clear direction. That is where my journey began.'
    ]
  },
  {
    id: 'today',
    title: 'Where I Am Today',
    icon: <Rocket size={18} />,
    tagline: 'Building with purpose',
    paragraphs: [
      'Today, I am pursuing my path as a full-stack developer, continuously expanding my knowledge across frontend, backend, databases, APIs, and modern development tools.',
      'My goal is not simply to learn technologies, but to understand how they work together to solve real problems. Every project is another step toward becoming a developer who can turn an idea into a complete, meaningful product.'
    ]
  },
  {
    id: 'next',
    title: "What's Next",
    icon: <Compass size={18} />,
    tagline: 'Always moving forward',
    paragraphs: [
      'My journey is still just beginning. By the will of the GOD I want to keep growing as a full-stack developer, deepen my understanding of technology, and challenge myself with bigger and more meaningful projects.',
      'My goal is to move beyond simply learning how to build software and become someone who can use technology to solve real problems and create things that make a difference.',
      'There is still a lot to learn, and I am ready for the journey ahead.'
    ]
  }
];

// --- Beyond the Code Data ---
const githubStats = [
  { icon: <Star size={16} />, label: 'Stars', value: '12' },
  { icon: <GitFork size={16} />, label: 'Forks', value: '8' },
  { icon: <Users size={16} />, label: 'Followers', value: '5' },
  { icon: <GitCommit size={16} />, label: 'Contributions', value: '156' },
  { icon: <Code2 size={16} />, label: 'Repositories', value: '10+' },
  { icon: <Terminal size={16} />, label: 'Languages', value: '3' },
];

const techDistribution = [
  { name: 'Frontend', percentage: 30, color: '#61dafb' },
  { name: 'Backend', percentage: 35, color: '#68a063' },
  { name: 'Database', percentage: 15, color: '#f7df1e' },
  { name: 'DevOps', percentage: 10, color: '#f34f29' },
  { name: 'Tools & Others', percentage: 10, color: '#8892b0' },
];

const commitActivity = [
  { day: 'Mon', count: 8 },
  { day: 'Tue', count: 12 },
  { day: 'Wed', count: 6 },
  { day: 'Thu', count: 15 },
  { day: 'Fri', count: 10 },
  { day: 'Sat', count: 4 },
  { day: 'Sun', count: 2 },
];

const maxCommitCount = Math.max(...commitActivity.map(c => c.count));

const socialPlatforms = [
  { name: 'GitHub', icon: <Github size={18} />, color: '#64ffda', reach: '10+ repos', activity: '156 contributions', url: 'https://github.com/Tesfaye-kel' },
  { name: 'LinkedIn', icon: <Linkedin size={18} />, color: '#0a66c2', reach: '500+ connections', activity: 'Professional network', url: 'https://linkedin.com' },
  { name: 'Twitter/X', icon: <Share2 size={18} />, color: '#1da1f2', reach: '100+ followers', activity: 'Tech insights', url: 'https://twitter.com' },
  { name: 'Facebook', icon: <Share2 size={18} />, color: '#1877f2', reach: '200+ friends', activity: 'Personal updates', url: 'https://facebook.com' },
];

const socialPosts = [
  {
    platform: 'GitHub',
    title: 'Built Zenivial Social Network',
    content: 'Just shipped a full MERN stack social media platform with real-time messaging! 🚀',
    likes: 45,
    comments: 12,
    views: 230,
    time: '2 days ago',
  },
  {
    platform: 'LinkedIn',
    title: 'Open to Opportunities',
    content: 'I\'m excited to share that I\'m open to new opportunities as a Full Stack Developer!',
    likes: 89,
    comments: 23,
    views: 1200,
    time: '1 week ago',
  },
  {
    platform: 'Twitter/X',
    title: 'Learning TypeScript',
    content: 'Day 15 of learning TypeScript. The type system is a game changer! 💪 #TypeScript #WebDev',
    likes: 34,
    comments: 8,
    views: 450,
    time: '3 days ago',
  },
  {
    platform: 'Facebook',
    title: 'Restaurant Management System',
    content: 'Proud of my latest project - a complete restaurant management system! 🍽️',
    likes: 67,
    comments: 15,
    views: 890,
    time: '5 days ago',
  },
];

const personalityTraits = [
  { label: 'Problem Solving', value: 90 },
  { label: 'Creativity', value: 85 },
  { label: 'Communication', value: 80 },
  { label: 'Teamwork', value: 88 },
  { label: 'Adaptability', value: 92 },
  { label: 'Leadership', value: 75 },
  { label: 'Emotional Intelligence', value: 85 },
  { label: 'Time Management', value: 82 },
  { label: 'Self-Motivation', value: 86 },
];

const interests = [
  { icon: <Code2 size={18} />, label: 'Coding', desc: 'Building things that live on the internet', color: '#64ffda' },
  { icon: <Coffee size={18} />, label: 'Coffee', desc: 'Fuel for late-night debugging sessions', color: '#d97706' },
  { icon: <Music size={18} />, label: 'Music', desc: 'The soundtrack to my development flow', color: '#8b5cf6' },
  { icon: <BookOpen size={18} />, label: 'Learning', desc: 'Always exploring new technologies', color: '#3b82f6' },
  { icon: <Gamepad2 size={18} />, label: 'Gaming', desc: 'Strategy games sharpen my problem-solving', color: '#ef4444' },
  { icon: <Camera size={18} />, label: 'Photography', desc: 'Capturing moments and perspectives', color: '#f59e0b' },
  { icon: <Globe size={18} />, label: 'Travel', desc: 'Exploring new places and cultures', color: '#10b981' },
  { icon: <Dumbbell size={18} />, label: 'Fitness', desc: 'Keeping the body and mind sharp', color: '#f97316' },
  { icon: <Plane size={18} />, label: 'Adventure', desc: 'Seeking new challenges and experiences', color: '#06b6d4' },
];

const dailyHabits = [
  { icon: <Code2 size={16} />, label: 'Code', time: '4-6 hrs', color: '#64ffda' },
  { icon: <BookOpen size={16} />, label: 'Learn', time: '1-2 hrs', color: '#3b82f6' },
  { icon: <Coffee size={16} />, label: 'Coffee', time: '3 cups', color: '#d97706' },
  { icon: <Music size={16} />, label: 'Music', time: '2 hrs', color: '#8b5cf6' },
  { icon: <Dumbbell size={16} />, label: 'Exercise', time: '1 hr', color: '#f97316' },
  { icon: <Users size={16} />, label: 'Connect', time: '1 hr', color: '#10b981' },
];

const About = () => {
  const { data } = usePortfolio();
  const { profile, about } = data;

  const fullName = profile?.name || "Tesfaye Kelbesa";
  const professionalTitle = profile?.title || "Full-Stack Developer";
  const displayExperience = about?.experience?.length ? about.experience : experienceData;
  const cvUrl = about?.cvUrl || `${baseUrl}cv.pdf`;

  const whatMakesMeDifferent = about?.whatMakesMeDifferent || [
    "🔍 Curiosity & Continuous Learning - I enjoy learning something new every day, whether it's a new technology, a better way to solve a problem, or a different perspective from others. Staying curious helps me continuously improve as an engineer and as a person.",
    "🌍 Cosmopolitan by Nature - I value diversity in cultures, backgrounds, ideas, and ways of thinking. My life has exposed me to struggles shaped by society and politics, but I choose to remain open-minded rather than defined by political labels. I learn from different perspectives while staying true to my own values, curiosity, and identity.",
    "📅 Consistency Over Motivation - I believe progress comes from consistent effort rather than waiting for motivation. I maintain daily habits of learning, coding, experimenting, and improving—even when the results aren't immediate.",
    "🎯 Building With Purpose - I don't want to write code simply because I can. I'm interested in understanding why something needs to be built and who it helps. I aim to create software that is useful, maintainable, and meaningful to its users.",
    "🤝 Independent Thinker & Collaborative Teammate - I'm comfortable exploring ideas independently, researching solutions, and taking ownership of my work. At the same time, I value teamwork, open communication, feedback, and learning from people with different experiences.",
    "🧘 Calm Under Pressure - I believe staying calm is one of the most valuable skills when facing difficult problems. When things don't go as planned, I take a step back, understand the situation, and approach the problem logically rather than reacting emotionally. This helps me make better decisions, solve problems effectively, and remain reliable when challenges arise."
  ];

  return (
    <section id="about" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Introduction - Editorial Layout */}
        <SectionHeader number="01" title="About Me" />
        
        {/* Story Journey with Indentation Guides */}
        <div className="grid lg:grid-cols-5 gap-12 mb-32">
          {/* Indentation Guides - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 hidden lg:block"
          >
            <div className="relative h-full min-h-[560px]">
              {/* Main vertical guide line - moved more to the right */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="absolute left-[35%] top-2 bottom-10 w-[2px] origin-top bg-gradient-to-b from-primary/60 via-primary/25 to-primary/5"
                style={{ 
                  boxShadow: '0 0 25px rgba(100,255,218,0.3), 0 0 50px rgba(100,255,218,0.12), 0 0 75px rgba(100,255,218,0.06)'
                }}
              />

              {/* Guide nodes with arrows */}
              {storySections.map((section, index) => {
                const positions = ['top-[16%]', 'top-[48%]', 'top-[80%]'];
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                    className={`absolute ${positions[index]} left-[35%] -translate-y-1/2 w-[320px]`}
                  >
                    {/* Node dot on main line - larger */}
                    <div className="absolute -left-[8px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0a192f] border-[3px] border-primary/70 shadow-[0_0_20px_rgba(100,255,218,0.7)]" />
                    
                    {/* Horizontal connector with arrow - thicker line and bigger arrow */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center w-[calc(100%-1.5rem)]">
                      <div 
                        className="flex-1 h-[2px] bg-gradient-to-r from-primary/60 to-primary/25"
                        style={{ boxShadow: '0 0 12px rgba(100,255,218,0.35)' }}
                      />
                      <ArrowRight size={24} strokeWidth={4} className="text-primary/80 ml-1.5 shrink-0 drop-shadow-[0_0_6px_rgba(100,255,218,0.4)]" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Story Sections - Right Column */}
          <div className="lg:col-span-3 space-y-14 my-16">
            {storySections.map((section, index) => (
              <StorySection key={section.id} {...section} index={index} />
            ))}
          </div>
        </div>

        {/* What makes me different - Card Container */}
        <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50 mt-6 mb-32">
          <div className="flex flex-col items-center gap-3 mb-6 text-center">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent shadow-[0_0_30px_rgba(100,255,218,0.4)] drop-shadow-[0_0_20px_rgba(100,255,218,0.3)]">What Shines Through Me</h3>
              <p className="text-xs text-slate-500 font-mono">The principles that shape how I work</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {whatMakesMeDifferent.map((item, index) => {
              const [title, ...descParts] = item.split(' - ');
              const description = descParts.join(' - ');
              const emoji = title.split(' ')[0]; // Get emoji from title
              const titleText = title.substring(2); // Remove emoji
              
              // Assign colors to each item
              const colors = [
                '#64ffda', // Cyan (Curiosity)
                '#3b82f6', // Blue (Cosmopolitan)
                '#f59e0b', // Amber (Consistency)
                '#10b981', // Green (Purpose)
                '#8b5cf6', // Purple (Independent)
                '#f97316'  // Orange (Calm)
              ];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-3 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50 hover:border-primary/30 hover:bg-primary/5 transition-all min-h-[140px] flex flex-col items-center justify-between"
                >
                  <span className="text-3xl">{emoji}</span>
                  <span className="text-xs font-semibold text-slate-200 text-center leading-tight">{titleText}</span>
                  <div className="flex items-start gap-2 w-full">
                    <ArrowRight size={10} className="shrink-0 mt-0.5" style={{ color: colors[index] }} />
                    <span className="text-[10px] text-slate-400 leading-tight text-left">{description}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. Beyond the Code - Standard Cards */}
        <div className="mb-32">
          <SectionHeader number="02" title="Beyond the Code" subtitle="A deeper look at who I am as a developer and person" />

          {/* Language & Personality - Side by Side */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Technology Distribution - Circle Chart */}
            <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Code2 size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100">Technology Distribution</h3>
                  <p className="text-xs text-slate-500 font-mono">Where I focus my skills</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                {/* Circle chart using conic-gradient */}
                <div className="relative w-48 h-48 rounded-full mb-6"
                  style={{
                    background: `conic-gradient(
                      #61dafb 0% 30%,
                      #68a063 30% 65%,
                      #f7df1e 65% 80%,
                      #f34f29 80% 90%,
                      #8892b0 90% 100%
                    )`
                  }}
                >
                  <div className="absolute inset-3 rounded-full bg-[#0a192f] flex items-center justify-center">
                    <div className="text-center">
                      <Code2 size={24} className="text-primary mx-auto mb-1" />
                      <p className="text-xs font-mono text-slate-400">Technologies</p>
                    </div>
                  </div>
                </div>
                {/* Legend */}
                <div className="w-full space-y-3">
                  {techDistribution.map((tech, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tech.color }} />
                        {tech.name}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{tech.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Personality Traits Only */}
            <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Brain size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100">Personality Traits</h3>
                  <p className="text-xs text-slate-500 font-mono">Core strengths</p>
                </div>
              </div>
              <div className="space-y-3">
                {personalityTraits.map((trait, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-300">{trait.label}</span>
                      <span className="text-xs font-mono text-primary">{trait.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#0a192f]/60 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${trait.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary/40 to-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interests & Hobbies */}
          <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50 mt-6">
            <div className="flex flex-col items-center gap-3 mb-6 text-center">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Compass size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-100">Interests & Hobbies</h3>
                <p className="text-xs text-slate-500 font-mono">Beyond the code</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {interests.map((interest, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="p-3 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50 hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span style={{ color: interest.color }}>{interest.icon}</span>
                    <span className="text-xs font-mono text-slate-300">{interest.label}</span>
                    <span className="text-[10px] text-slate-500 text-center leading-tight">{interest.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Developer Code Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="code-block mt-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-500/50" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <span className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-2 text-xs text-slate-500 font-mono">developer.js</span>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code>
                <span className="comment">// The developer behind this portfolio</span>{"\n"}
                <span className="keyword">const</span> <span className="property">developer</span> = {"{"}{"\n"}
                {"  "}<span className="property">name</span>: <span className="string">"{fullName}"</span>,{"\n"}
                {"  "}<span className="property">role</span>: <span className="string">"{professionalTitle}"</span>,{"\n"}
                {"  "}<span className="property">frontend</span>: [<span className="string">"React"</span>, <span className="string">"Tailwind"</span>],{"\n"}
                {"  "}<span className="property">backend</span>: [<span className="string">"Node.js"</span>, <span className="string">"Express"</span>],{"\n"}
                {"  "}<span className="property">database</span>: [<span className="string">"MongoDB"</span>, <span className="string">"Firebase"</span>],{"\n"}
                {"  "}<span className="property">passion</span>: <span className="string">"Building scalable solutions"</span>,{"\n"}
                {"  "}<span className="property">currentlyLearning</span>: <span className="string">"TypeScript, Docker"</span>,{"\n"}
                {"}"};
              </code>
            </pre>
          </motion.div>
        </div>

        {/* 3. Statistics */}
        <div className="mb-32">
          <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: 15, suffix: '+', label: 'Projects Built' },
                { value: 3, suffix: '+', label: 'Years Learning' },
                { value: 15, suffix: '+', label: 'Technologies' },
                { value: 20, suffix: '+', label: 'GitHub Repos' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50 text-center hover:border-primary/30 transition-colors"
                >
                  <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-slate-400 text-sm font-mono">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Experience Timeline */}
        <div id="experience" className="mb-32">
          <SectionHeader number="03" title="Experience" subtitle="My professional journey and growth" />

          <div className="grid lg:grid-cols-5 gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:col-span-2 lg:order-2 h-full p-5 rounded-xl bg-[#112240]/40 border border-[#233554]/50"
            >
              <div className="h-full flex flex-col gap-4">
                <div className="flex-1 p-5 rounded-lg bg-gradient-to-br from-[#112240]/70 to-[#0a192f]/70 border border-[#233554]/50 hover:border-primary/30 transition-all">
                  <div className="p-3 w-fit rounded-lg bg-primary/10 text-primary mb-5">
                    <Rocket size={22} />
                  </div>
                  <p className="text-primary font-mono text-xs uppercase tracking-widest mb-2">Have an idea?</p>
                  <h3 className="text-2xl font-bold text-slate-100 mb-3">Build Something</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">
                    I turn thoughtful ideas into useful, reliable digital experiences. Let&apos;s create something that makes a difference.
                  </p>
                  <a href="#contact" className="magnetic-btn w-full justify-center mt-4">
                    Start a conversation <ArrowRight size={16} />
                  </a>
                </div>

                <div className="group flex-1 flex flex-col p-4 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50 hover:border-primary/30 hover:bg-primary/5 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                      <Download size={20} />
                    </span>
                    <h3 className="text-sm font-semibold text-slate-100">Download My CV</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Every project, challenge, and experience has shaped the way I think, learn, and build. My CV brings together the journey behind my work - from the skills I&apos;ve developed and the problems I&apos;ve solved to the experiences that continue to shape me as an engineer. Take a closer look at where I&apos;ve been, what I&apos;ve learned, and where I&apos;m heading next.
                  </p>
                  <a
                    href={cvUrl}
                    download
                    className="magnetic-btn w-full justify-center mt-4"
                  >
                    <Download size={15} /> Download My CV <ArrowRight size={15} />
                  </a>
                </div>

                <div className="group flex-1 flex flex-col p-4 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50 hover:border-primary/30 hover:bg-primary/5 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                      <BriefcaseBusiness size={20} />
                    </span>
                    <h3 className="text-sm font-semibold text-slate-100">Hire Me</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Good work starts with the right people, clear communication, and a shared purpose. I&apos;m always interested in opportunities where I can bring my skills, curiosity, and problem-solving mindset to a team that values thoughtful work. If you&apos;re looking for someone who is ready to learn, contribute, and take ownership, I&apos;d be glad to connect and explore what we can build together.
                  </p>
                  <a
                    href="#contact"
                    className="magnetic-btn w-full justify-center mt-4"
                  >
                    Hire Me <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="order-1 lg:col-span-3 lg:order-1 p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
              <div className="relative pl-8">
                <div className="timeline-line" />
                <motion.div
                  className="timeline-line-progress"
                  style={{ height: '0%' }}
                  initial={{ height: '0%' }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />

                <div className="space-y-10">
                  {displayExperience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="relative"
                    >
                      <div className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-primary border-4 border-[#0a192f] shadow-[0_0_10px_rgba(100,255,218,0.5)]" />

                      <div className="p-5 rounded-lg bg-[#0a192f]/45 border border-[#233554]/50 hover:border-primary/30 transition-all duration-300">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                            <p className="text-primary font-mono text-xs mt-1">{exp.company}</p>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono">
                            {exp.period}
                          </span>
                        </div>

                        <p className="text-sm text-slate-400 mb-4">{exp.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {exp.technologies.map((tech, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-md bg-[#0a192f]/60 border border-[#233554]/50 text-[10px] font-mono text-primary/80">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                              <span className="text-primary mt-0.5"><ArrowRight size={11} /></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Tech Stack */}
        <div id="skills" className="mb-32">
          <SectionHeader number="04" title="Tech Stack" subtitle="Technologies I work with daily" />
          
          <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(techStack).map(([key, category], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50"
                >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.technologies.map((tech, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-300 group-hover:text-primary transition-colors">
                          {tech.name}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{tech.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#0a192f]/60 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400"
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {tech.desc}
                      </p>
                    </div>
                  ))}
                </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div id="services" className="mb-12">
          <SectionHeader number="06" title="Services" subtitle="What I can do for you" />
          
          <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
            <div className="grid md:grid-cols-2 gap-6">
              {servicesData.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="tech-card group"
                >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 pt-2">{service.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-[#0a192f]/60 border border-[#233554]/50 text-xs font-mono text-primary/70">
                      {tech}
                    </span>
                  ))}
                </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;