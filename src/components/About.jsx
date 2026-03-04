import { motion } from "framer-motion";
import { usePortfolio } from '../context/PortfolioContext';

// --- Icons ---
const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
);
const PhoneIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
);

// SkillBar component
const SkillBar = ({ skill, percentage }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="font-mono text-base font-medium text-slate-300">{skill}</span>
      <span className="text-sm font-medium text-primary">{percentage}%</span>
    </div>
    <div className="w-full bg-slate-700 rounded-full h-2.5">
      <motion.div
        className="bg-primary h-2.5 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </div>
  </div>
);

const About = () => {
  const { data } = usePortfolio();
  const { profile, about } = data;

  // Data based on the user's request structure
  const fullName = profile?.name || "Tesfaye Kelbesa";
  const professionalTitle = profile?.title || "Full-Stack Developer";

  const introduction = `Hi, I’m ${fullName}, a ${professionalTitle} specializing in responsive and user-friendly web applications.`;

  const technicalSkills = about?.technicalSkills || [
    { name: "HTML & CSS", percentage: 95 },
    { name: "JavaScript (ES6+)", percentage: 90 },
    { name: "React & Next.js", percentage: 88 },
    { name: "Node.js & Express", percentage: 82 },
    { name: "Python & Django", percentage: 75 },
    { name: "Databases (SQL & NoSQL)", percentage: 80 },
  ];

  const tools = about?.tools || ["Git & GitHub", "Figma", "VS Code", "Docker", "Jira", "Postman"];
  const softSkills = about?.softSkills || ["Problem-Solving", "Teamwork", "Communication", "Adaptability", "Creativity"];

  const experience = about?.experience || [
    {
      role: "Software Engineer",
      company: "Tech Solutions Inc.",
      period: "2021 - Present",
      description: "Developed and maintained web applications using React and Node.js, contributing to a 20% increase in user engagement."
    },
    {
      role: "Web Developer Intern",
      company: "Creative Minds Agency",
      period: "2020 - 2021",
      description: "Assisted in building client websites and implementing new features with a focus on responsive design."
    }
  ];

  const education = about?.education || {
    degree: "B.Sc. in Computer Science",
    university: "Addis Ababa University",
    period: "2018 - 2022"
  };

  const whatMakesMeDifferent = about?.whatMakesMeDifferent || "I focus on writing clean, scalable code and have a strong passion for modern web design. My work style is collaborative and agile, and I am always eager to tackle new challenges and learn from my peers. My goal is to create digital experiences that are not only functional but also delightful to use.";

  const careerGoals = about?.careerGoals || "I'm currently looking for a full-time role as a Software Engineer where I can apply my skills to solve complex problems and contribute to a forward-thinking team. I am also enthusiastic about collaborating on open-source projects and exploring freelance opportunities.";

  const contactInfo = [
    { icon: <MailIcon />, label: "Email", value: "tesfayekelbesa912@gmail.com", href: "mailto:tesfayekelbesa912@gmail.com" },
    { icon: <LinkedInIcon />, label: "LinkedIn", value: "linkedin.com/in/tesfaye-kelbesa", href: "https://linkedin.com" },
    { icon: <GitHubIcon />, label: "GitHub", value: "github.com/Tesfaye-kel", href: "https://github.com/Tesfaye-kel" },
    { icon: <PhoneIcon />, label: "Phone", value: "+251-912-345-678", href: "tel:+251912345678" }
  ];

  return (
    <section id="about" className="min-h-screen py-20 bg-navy text-slate-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Introduction */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            <span className="text-primary">About</span> Me
          </h2>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1 flex justify-center"
          >
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse" />
              <img 
                src={profile?.avatar || "/me.jpg"} 
                alt={fullName} 
                className="w-full h-full object-cover rounded-full p-2 bg-navy"
              />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 space-y-4 text-lg"
          >
            <p className="text-2xl font-semibold text-slate-100">👋</p>
            <p>{introduction}</p>
          </motion.div>
        </div>

        {/* 2. Skills */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-100 mb-8 text-center">💼 My <span className="text-primary">Skills</span></h3>
         
        </div>
         <div className="mb-20">
            <div className="mb-12">
              <h4 className="text-xl font-semibold text-slate-100 mb-6">Technical Skills</h4>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
              {technicalSkills.map(skill => (
                <SkillBar key={skill.name} skill={skill.name} percentage={skill.percentage} />
              ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
              <h4 className="text-xl font-semibold text-slate-100 mb-4">Tools & Technologies</h4>
              <ul className="flex flex-wrap gap-3">
                {tools.map((tool, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="bg-slate-800 text-primary font-mono px-4 py-2 rounded-lg text-sm"
                  >
                    {tool}
                  </motion.li>
                ))}
              </ul>
              </div>
              <div>
              <h4 className="text-xl font-semibold text-slate-100 mb-4">Soft Skills</h4>
              <ul className="flex flex-wrap gap-3">
                {softSkills.map((skill, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * (index + tools.length) }}
                    className="bg-slate-800 text-primary font-mono px-4 py-2 rounded-lg text-sm"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
              </div>
            </div>
          </div>
        {/* 3. Experience & Background */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-100 mb-8 text-center">🎯 Experience & <span className="text-primary">Background</span></h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-semibold text-slate-100 mb-6">Work Experience</h4>
              <div className="relative border-l-2 border-slate-700 pl-6 space-y-10">
                {experience.map((exp, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                    className="relative"
                  >
                    <div className="absolute -left-[33px] top-1 w-4 h-4 bg-primary rounded-full border-4 border-navy"></div>
                    <p className="text-sm text-primary font-mono">{exp.period}</p>
                    <h5 className="text-lg font-bold text-slate-100 mt-1">{exp.role}</h5>
                    <p className="text-slate-400 font-medium">{exp.company}</p>
                    <p className="mt-2 text-slate-400 text-sm">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-slate-100 mb-6">Education</h4>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <p className="text-sm text-primary font-mono">{edu.period}</p>
                    <h5 className="text-lg font-bold text-slate-100 mt-1">{edu.degree}</h5>
                    <p className="text-slate-400 font-medium">{edu.university}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. What Makes Me Different */}
        <div className="mb-20 text-center">
          <h3 className="text-3xl font-bold text-slate-100 mb-6">🌟 What Makes Me <span className="text-primary">Different</span></h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {whatMakesMeDifferent}
          </motion.p>
        </div>

        {/* 5. Career Goals */}
        <div className="mb-20 text-center">
          <h3 className="text-3xl font-bold text-slate-100 mb-6">📈 Career <span className="text-primary">Goals</span></h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {careerGoals}
          </motion.p>
        </div>
        {/* 6. Contact Information */}
        <div>
          <h3 className="text-3xl font-bold text-slate-100 mb-8 text-center">📬 Contact <span className="text-primary">Information</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center hover:border-primary/50 hover:-translate-y-1 transition-all"
              >
                <div className="text-primary mx-auto mb-4 w-10 h-10 flex items-center justify-center">{info.icon}</div>
                <h5 className="font-semibold text-slate-100">{info.label}</h5>
                <p className="text-sm text-slate-400 truncate">{info.value}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;