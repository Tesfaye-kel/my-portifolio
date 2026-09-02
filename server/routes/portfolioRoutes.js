import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Portfolio from '../models/Portfolio.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const uploadsDirectory = path.resolve('uploads');
fs.mkdirSync(uploadsDirectory, { recursive: true });
const upload = multer({
  dest: uploadsDirectory,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    callback(null, file.mimetype === 'application/pdf');
  },
});

// @desc    Get portfolio data
// @route   GET /api/portfolio
// @access  Public
router.get('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ docId: 'main' })
      .populate('projects')
      .populate('messages');

    if (!portfolio) {
      // Create default portfolio if none exists
      portfolio = await Portfolio.create({
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
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update portfolio section
// @route   PUT /api/portfolio/:section
// @access  Private
router.put('/:section', protect, async (req, res) => {
  try {
    const { section } = req.params;
    const sectionData = req.body;

    const allowedSections = ['profile', 'hero', 'about', 'socialLinks', 'gallery', 'contact', 'theme'];

    if (!allowedSections.includes(section)) {
      return res.status(400).json({ message: 'Invalid section' });
    }

    let portfolio = await Portfolio.findOne({ docId: 'main' });

    if (!portfolio) {
      portfolio = await Portfolio.create({ docId: 'main' });
    }

    portfolio[section] = sectionData;
    await portfolio.save();

    res.json({ message: `${section} updated successfully`, data: portfolio[section] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Upload the public CV
// @route   POST /api/portfolio/cv
// @access  Private
router.post('/cv', protect, upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF CV' });
    }

    const filename = `cv-${Date.now()}.pdf`;
    const finalPath = path.join(uploadsDirectory, filename);
    fs.renameSync(req.file.path, finalPath);

    let portfolio = await Portfolio.findOne({ docId: 'main' });
    if (!portfolio) portfolio = await Portfolio.create({ docId: 'main' });
    portfolio.about = { ...(portfolio.about?.toObject?.() || portfolio.about || {}), cvUrl: `/uploads/${filename}` };
    await portfolio.save();

    res.json({ message: 'CV uploaded successfully', cvUrl: `/uploads/${filename}` });
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update entire portfolio
// @route   PUT /api/portfolio
// @access  Private
router.put('/', protect, async (req, res) => {
  try {
    const portfolioData = req.body;
    let portfolio = await Portfolio.findOne({ docId: 'main' });

    if (!portfolio) {
      portfolio = await Portfolio.create({ docId: 'main', ...portfolioData });
    } else {
      // Update all provided fields
      Object.keys(portfolioData).forEach(key => {
        if (key !== 'docId' && key !== 'projects' && key !== 'messages') {
          portfolio[key] = portfolioData[key];
        }
      });
      await portfolio.save();
    }

    res.json({ message: 'Portfolio updated successfully', data: portfolio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;