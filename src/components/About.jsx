import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { usePortfolio } from '../context/PortfolioContext';
import { useRef, useState } from 'react';
import { 
  Code2, Database, Server, Wrench, 
  Github, Linkedin, Mail, Phone, 
  ArrowRight, Sparkles, Rocket, 
  Shield, Zap, Layout, GitBranch,
  Globe, Layers, Cpu, Terminal,
  Star, GitFork, Users, GitCommit,
  Share2, MessageCircle, Eye, ThumbsUp,
  Brain, Coffee, Music, BookOpen, 
  Gamepad2, Camera, Compass, Dumbbell, Plane
} from 'lucide-react';
import profileImg from '../../me.jpg';

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
    <div className="flex items-center justify-center gap-6 mb-6">
      <div className="flex-1 h-px bg-[#233554] max-w-[200px]" />
      <span className="font-mono text-primary text-lg">{number}.</span>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{title}</h2>
      <div className="flex-1 h-px bg-[#233554] max-w-[200px]" />
    </div>
    {subtitle && <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
  </motion.div>
);

// --- Tech Stack Data ---
const techStack = {
  frontend: {
    icon: <Layout size={20} />,
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
    icon: <Server size={20} />,
    title: 'Backend',
    color: '#68a063',
    technologies: [
      { name: 'Node.js', level: 85, desc: 'Event-driven architecture, REST APIs' },
      { name: 'Express', level: 85, desc: 'Middleware, routing, API design' },
      { name: 'REST APIs', level: 88, desc: 'CRUD operations, authentication, validation' },
    ]
  },
  database: {
    icon: <Database size={20} />,
    title: 'Database',
    color: '#4DB33D',
    technologies: [
      { name: 'MongoDB', level: 82, desc: 'NoSQL, Mongoose ODM, aggregation' },
      { name: 'Firebase', level: 78, desc: 'Realtime database, authentication, hosting' },
    ]
  },
  tools: {
    icon: <Wrench size={20} />,
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
    period: '2023 - Present',
    description: 'Building full-stack applications with the MERN stack. Developing scalable solutions for real-world problems.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    achievements: [
      'Built Zenivial Social Network - a real-time social media platform',
      'Developed Restaurant Management System with Firebase integration',
      'Created multiple responsive web applications',
      'Implemented real-time messaging with Socket.io'
    ]
  },
  {
    role: 'Frontend Developer',
    company: 'Open Source Contributions',
    period: '2022 - Present',
    description: 'Contributing to open-source projects and building reusable UI components. Collaborating with developers worldwide.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Git'],
    achievements: [
      'Contributed to multiple open-source repositories',
      'Built reusable component libraries',
      'Collaborated with international developer teams',
      'Improved code quality through code reviews'
    ]
  },
  {
    role: 'Web Development Mentor',
    company: 'Community Teaching',
    period: '2022 - Present',
    description: 'Mentoring aspiring developers and sharing knowledge through community leadership and content creation.',
    technologies: ['JavaScript', 'React', 'Node.js', 'Communication'],
    achievements: [
      'Mentored 10+ aspiring developers',
      'Created educational content for the developer community',
      'Led study groups and coding workshops',
      'Shared knowledge through community leadership'
    ]
  },
  {
    role: 'Computer Science Student',
    company: 'University',
    period: '2020 - Present',
    description: 'Pursuing a Bachelor\'s degree in Computer Science with a strong foundation in programming, algorithms, and database systems.',
    technologies: ['Data Structures', 'Algorithms', 'Database Systems', 'OOP'],
    achievements: [
      'Strong foundation in programming and algorithms',
      'Experience developing responsive web applications',
      'Skilled in both front-end and back-end development',
      'Active in academic projects and hackathons'
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
    title: 'Performance',
    description: 'Optimized interfaces with lazy loading, code splitting, and efficient rendering. Fast load times and smooth interactions.',
    color: '#fbbf24'
  },
  {
    icon: <Shield size={24} />,
    title: 'Security',
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
    title: 'Frontend Development',
    description: 'Building responsive, interactive user interfaces with React and modern CSS. Creating pixel-perfect designs that work across all devices.',
    technologies: ['React', 'Tailwind CSS', 'JavaScript']
  },
  {
    icon: <Server size={24} />,
    title: 'Full-Stack Development',
    description: 'End-to-end application development with the MERN stack. From database design to API development to frontend implementation.',
    technologies: ['Node.js', 'Express', 'MongoDB']
  },
  {
    icon: <Database size={24} />,
    title: 'Database Integration',
    description: 'Designing and implementing efficient database schemas. Optimizing queries and ensuring data integrity.',
    technologies: ['MongoDB', 'Firebase', 'Mongoose']
  },
  {
    icon: <Rocket size={24} />,
    title: 'Performance Optimization',
    description: 'Improving application speed and user experience through code optimization, caching, and efficient rendering strategies.',
    technologies: ['React', 'Vite', 'Webpack']
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

const githubLanguages = [
  { name: 'JavaScript', percentage: 45, color: '#f7df1e' },
  { name: 'TypeScript', percentage: 20, color: '#3178c6' },
  { name: 'HTML/CSS', percentage: 20, color: '#e34c26' },
  { name: 'Python', percentage: 10, color: '#3776ab' },
  { name: 'Other', percentage: 5, color: '#8892b0' },
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

  const introduction = `Hi, I'm ${fullName}, a ${professionalTitle} focused on developing responsive, secure, and user-friendly web applications. I love designing clean interfaces, building efficient backend systems, and continuously learning new technologies to create innovative digital solutions that solve real-world problems.`;

  const education = about?.education || [
    "Bachelor's Degree in Computer Science.",
    "Strong foundation in programming, algorithms, and database systems.",
    "Experience developing responsive and user-friendly web applications.",
    "Skilled in both front-end and back-end development.",
    "Passionate about building scalable web solutions and learning new technologies."
  ];

  const whatMakesMeDifferent = about?.whatMakesMeDifferent || [
    "🔍 Curiosity & Continuous Learning - I enjoy learning something new every day, whether it's a new technology, a better way to solve a problem, or a different perspective from others. Staying curious helps me continuously improve as an engineer and as a person.",
    "🧩 Problem-Solving Mindset - I naturally enjoy breaking complicated problems into smaller, manageable pieces. Whether I'm debugging code, planning a project, or handling everyday challenges, I focus on understanding the root cause and finding practical solutions.",
    "📅 Consistency Over Motivation - I believe progress comes from consistent effort rather than waiting for motivation. I maintain daily habits of learning, coding, experimenting, and improving—even when the results aren't immediate.",
    "🎯 Building With Purpose - I don't want to write code simply because I can. I'm interested in understanding why something needs to be built and who it helps. I aim to create software that is useful, maintainable, and meaningful to its users.",
    "🤝 Independent Thinker & Collaborative Teammate - I'm comfortable exploring ideas independently, researching solutions, and taking ownership of my work. At the same time, I value teamwork, open communication, feedback, and learning from people with different experiences.",
    "🧘 Calm Under Pressure - I believe staying calm is one of the most valuable skills when facing difficult problems. When things don't go as planned, I take a step back, understand the situation, and approach the problem logically rather than reacting emotionally. This helps me make better decisions, solve problems effectively, and remain reliable when challenges arise."
  ];

  const careerGoals = about?.careerGoals || "I'm currently looking for a full-time role as a Software Engineer where I can apply my skills to solve complex problems and contribute to a forward-thinking team. I am also enthusiastic about collaborating on open-source projects and exploring freelance opportunities.";

  const contactInfo = [
    { icon: <Mail size={18} />, label: "Email", value: "tesfayekelbesa912@gmail.com", href: "mailto:tesfayekelbesa912@gmail.com" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", value: "linkedin.com/in/tesfaye-kelbesa", href: "https://linkedin.com" },
    { icon: <Github size={18} />, label: "GitHub", value: "github.com/Tesfaye-kel", href: "https://github.com/Tesfaye-kel" },
    { icon: <Phone size={18} />, label: "Phone", value: "+251-912-345-678", href: "tel:+251912345678" }
  ];

  return (
    <section id="about" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Introduction - Editorial Layout */}
        <SectionHeader number="01" title="About Me" subtitle="Get to know the developer behind the code" />
        
        <div className="grid lg:grid-cols-5 gap-12 items-start mb-32">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="lg:col-span-2"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-[#233554]/50">
                <img 
                  src={profileImg} 
                  alt={fullName} 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent" />
              </div>
              
              {/* Floating metadata */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-6 p-4 rounded-xl bg-[#112240]/90 backdrop-blur-md border border-[#233554]/50 shadow-xl"
              >
                <p className="font-mono text-primary text-sm">Based in</p>
                <p className="text-slate-300 font-medium">Addis Ababa, Ethiopia</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Introduction Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <p className="text-slate-400 text-lg leading-relaxed mb-8">{introduction}</p>
            
            {/* Code snippet */}
            <div className="code-block mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-500/50" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <span className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="ml-2 text-xs text-slate-500 font-mono">developer.js</span>
              </div>
              <pre className="text-sm">
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
            </div>

            {/* Career goals */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-[#112240]/60 to-[#0a192f]/60 border border-[#233554]/50">
              <h3 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <Rocket size={20} className="text-primary" />
                Career Direction
              </h3>
              <p className="text-slate-400 leading-relaxed">{careerGoals}</p>
            </div>
          </motion.div>
        </div>

        {/* What makes me different - Full width */}
        <div className="my-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-20"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 flex items-center justify-center gap-3">
              <Sparkles size={28} className="text-primary" />
              What Makes Me Different
            </h3>
            <div className="w-24 h-1 bg-primary/60 rounded-full mx-auto mt-4" />
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-8">
            {whatMakesMeDifferent.map((item, index) => {
              const [title, ...descParts] = item.split(' - ');
              const description = descParts.join(' - ');
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group p-5 rounded-xl bg-[#112240]/40 border border-[#233554]/30 hover:border-primary/30 hover:bg-[#112240]/60 transition-all duration-300"
                >
                  <p className="font-semibold text-slate-200 mb-2 leading-snug text-left">{title}</p>
                  <p className="text-sm text-slate-400 leading-relaxed text-left">{description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. Beyond the Code - Standard Cards */}
        <div className="mb-32">
          <SectionHeader number="02" title="Beyond the Code" subtitle="A deeper look at who I am as a developer and person" />

          {/* GitHub Activity - Standard Card */}
          <div className="mb-12">
            <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Github size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100">GitHub Activity</h3>
                    <p className="text-xs text-slate-500 font-mono">@Tesfaye-kel</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {githubStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="p-4 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50 text-center hover:border-primary/30 transition-colors"
                  >
                    <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                    <p className="text-xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-xs text-slate-500 font-mono mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Language Distribution */}
              <div className="mb-8">
                <h4 className="text-sm font-mono text-slate-400 mb-4 flex items-center gap-2">
                  <Code2 size={14} className="text-primary" />
                  Language Distribution
                </h4>
                <div className="space-y-3">
                  {githubLanguages.map((lang, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="flex items-center gap-2 text-sm text-slate-300">
                          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: lang.color }} />
                          {lang.name}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{lang.percentage}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#0a192f]/60 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commit Activity */}
              <div className="pt-6 border-t border-[#233554]/50">
                <h4 className="text-sm font-mono text-slate-400 mb-4 flex items-center gap-2">
                  <GitCommit size={14} className="text-primary" />
                  Weekly Commit Activity
                </h4>
                <div className="space-y-2">
                  {commitActivity.map((commit) => (
                    <div key={commit.day} className="flex items-center gap-3">
                      <span className="w-8 text-xs font-mono text-slate-500">{commit.day}</span>
                      <div className="flex-1 h-2 rounded-full bg-[#0a192f]/60 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(commit.count / maxCommitCount) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-primary/40 to-primary"
                        />
                      </div>
                      <span className="w-8 text-xs font-mono text-primary text-right">{commit.count}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-slate-500 font-mono mt-4">
                  Most active on <span className="text-primary">Thursdays</span> · {maxCommitCount} commits/day
                </p>
              </div>
            </div>
          </div>

          {/* Social Media & Personality - Standard Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Social Media Presence */}
            <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Share2 size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100">Social Media Presence</h3>
                  <p className="text-xs text-slate-500 font-mono">Where I share my work</p>
                </div>
              </div>

              {/* Platform list */}
              <div className="space-y-3 mb-6">
                {socialPlatforms.map((platform, i) => (
                  <motion.a
                    key={i}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span style={{ color: platform.color }}>{platform.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{platform.name}</p>
                        <p className="text-xs text-slate-500 font-mono">{platform.activity}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono group-hover:text-primary transition-colors">
                      {platform.reach}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Recent posts */}
              <div className="pt-6 border-t border-[#233554]/50">
                <h4 className="text-sm font-mono text-slate-400 mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  {socialPosts.map((post, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="p-4 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-primary">{post.platform}</span>
                        <span className="text-xs text-slate-500">{post.time}</span>
                      </div>
                      <p className="text-sm font-medium text-slate-200 mb-1">{post.title}</p>
                      <p className="text-sm text-slate-400 mb-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><ThumbsUp size={12} className="text-primary" /> {post.likes}</span>
                        <span className="flex items-center gap-1"><MessageCircle size={12} /> {post.comments}</span>
                        <span className="flex items-center gap-1"><Eye size={12} /> {post.views}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Personality & Interests */}
            <div className="space-y-6">
              {/* Personality Traits */}
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

              {/* Interests & Hobbies */}
              <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
                <div className="flex items-center gap-3 mb-6">
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

              {/* Daily Habits */}
              <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100">Daily Habits</h3>
                    <p className="text-xs text-slate-500 font-mono">A typical day</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dailyHabits.map((habit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span style={{ color: habit.color }}>{habit.icon}</span>
                        <span className="text-sm text-slate-300">{habit.label}</span>
                      </div>
                      <span className="text-xs font-mono text-primary">{habit.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Statistics */}
        <div className="mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 3, suffix: '+', label: 'Projects Built' },
              { value: 4, suffix: '+', label: 'Years Learning' },
              { value: 15, suffix: '+', label: 'Technologies' },
              { value: 10, suffix: '+', label: 'GitHub Repos' },
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

        {/* 4. Experience Timeline */}
        <div id="experience" className="mb-32">
          <SectionHeader number="03" title="Experience" subtitle="My professional journey and growth" />
          
          <div className="relative pl-8">
            {/* Timeline line */}
            <div className="timeline-line" />
            <motion.div
              className="timeline-line-progress"
              style={{ height: '0%' }}
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            
            <div className="space-y-16">
              {experienceData.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-primary border-4 border-[#0a192f] shadow-[0_0_10px_rgba(100,255,218,0.5)]" />
                  
                  <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50 hover:border-primary/30 transition-all duration-300 hover:translate-x-2">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                        <p className="text-primary font-mono text-sm mt-1">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono">
                        {exp.period}
                      </span>
                    </div>
                    
                    <p className="text-slate-400 mb-4">{exp.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 rounded-md bg-[#0a192f]/60 border border-[#233554]/50 text-xs font-mono text-primary/80">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="text-primary mt-1"><ArrowRight size={12} /></span>
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

        {/* 5. Tech Stack */}
        <div id="skills" className="mb-32">
          <SectionHeader number="04" title="Tech Stack" subtitle="Technologies I work with daily" />
          
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

        {/* 6. Engineering Principles */}
        <div className="mb-32">
          <SectionHeader number="05" title="Engineering Mindset" subtitle="How I approach development" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineeringPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="tech-card"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${principle.color}15`, color: principle.color }}
                  >
                    {principle.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-2">{principle.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{principle.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 7. Services */}
        <div id="services" className="mb-32">
          <SectionHeader number="06" title="Services" subtitle="What I can do for you" />
          
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

        {/* 8. Education & Contact */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50"
          >
            <h3 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <Terminal size={20} className="text-primary" />
              Education
            </h3>
            <ul className="space-y-3">
              {education.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 text-slate-400"
                >
                  <span className="text-primary mt-1"><ArrowRight size={14} /></span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50"
          >
            <h3 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <Mail size={20} className="text-primary" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(100, 255, 218, 0.05)" }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-[#233554]/50 hover:border-primary/30 transition-all"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">{info.label}</p>
                    <p className="text-sm text-slate-300 truncate">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;