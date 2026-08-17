import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import Portfolio from './models/Portfolio.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
    console.log('MongoDB connected for seeding...');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username: 'Tesfaye' });
    if (!existingAdmin) {
      await Admin.create({
        username: 'Tesfaye',
        password: 'YourStrongPasswordHere',
        email: 'tesfayekelbesa912@gmail.com',
        name: 'Tesfaye Kelbesa',
      });
      console.log('✓ Admin user created (username: Tesfaye, password: YourStrongPasswordHere)');
    } else {
      console.log('✓ Admin user already exists');
    }

    // Check if portfolio exists
    const existingPortfolio = await Portfolio.findOne({ docId: 'main' });
    if (!existingPortfolio) {
      await Portfolio.create({
        docId: 'main',
        profile: {
          name: 'Tesfaye Kelbesa',
          title: 'Full Stack Developer',
          tagline: 'Building digital experiences',
          email: 'tesfayekelbesa912@gmail.com',
          location: 'Addis Ababa, Ethiopia',
          avatar: '/me.jpg',
        },
        hero: {
          greeting: 'Hi, I am',
          name: 'Tesfaye Kelbesa',
          subtitle: 'Full Stack Developer',
          description: 'I build things for the web.',
          ctaText: 'Get in Touch',
          ctaLink: '#contact',
        },
        about: {
          introduction: "Hi, I'm Tesfaye...",
          technicalSkills: [
            { name: 'HTML & CSS', percentage: 95 },
            { name: 'JavaScript (ES6+)', percentage: 90 },
            { name: 'React & Next.js', percentage: 88 },
            { name: 'Node.js & Express', percentage: 82 },
            { name: 'Python & Django', percentage: 75 },
            { name: 'Databases (SQL & NoSQL)', percentage: 80 },
          ],
          tools: ['Git & GitHub', 'Figma', 'VS Code', 'Docker', 'Jira', 'Postman'],
          softSkills: ['Problem-Solving', 'Teamwork', 'Communication', 'Adaptability', 'Creativity'],
          experience: [],
          education: [
            'Bachelor’s Degree in Computer Science.',
            'Strong foundation in programming, algorithms, and database systems.',
            'Experience developing responsive and user-friendly web applications.',
            'Skilled in both front-end and back-end development.',
            'Passionate about building scalable web solutions and learning new technologies.'
          ],
          whatMakesMeDifferent: [
            '🔍 Curiosity & Continuous Learning - I enjoy learning something new every day, whether it\'s a new technology, a better way to solve a problem, or a different perspective from others. Staying curious helps me continuously improve as an engineer and as a person.',
            '🌍 Cosmopolitan by Nature - I value diversity in cultures, backgrounds, ideas, and ways of thinking. My life has exposed me to struggles shaped by society and politics, but I choose to remain open-minded rather than defined by political labels. I learn from different perspectives while staying true to my own values, curiosity, and identity.',
            '📅 Consistency Over Motivation - I believe progress comes from consistent effort rather than waiting for motivation. I maintain daily habits of learning, coding, experimenting, and improving—even when the results aren\'t immediate.',
            '🎯 Building With Purpose - I don\'t want to write code simply because I can. I\'m interested in understanding why something needs to be built and who it helps. I aim to create software that is useful, maintainable, and meaningful to its users.',
            '🤝 Independent Thinker & Collaborative Teammate - I\'m comfortable exploring ideas independently, researching solutions, and taking ownership of my work. At the same time, I value teamwork, open communication, feedback, and learning from people with different experiences.',
            '🧘 Calm Under Pressure - I believe staying calm is one of the most valuable skills when facing difficult problems. When things don\'t go as planned, I take a step back, understand the situation, and approach the problem logically rather than reacting emotionally. This helps me make better decisions, solve problems effectively, and remain reliable when challenges arise.'
          ],
          careerGoals: '',
        },
        socialLinks: [],
        gallery: [],
        contact: {
          email: 'tesfayekelbesa912@gmail.com',
          description: "I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.",
        },
        theme: 'dark',
      });
      console.log('✓ Portfolio data created');
    } else {
      console.log('✓ Portfolio data already exists');
    }

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();