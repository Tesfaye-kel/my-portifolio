import express from 'express';
import Project from '../models/Project.js';
import Portfolio from '../models/Portfolio.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create project
// @route   POST /api/projects
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, technologies, github, live, image, featured, order } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Project title is required' });
    }

    const project = await Project.create({
      title,
      description: description || '',
      technologies: technologies || [],
      github: github || '',
      live: live || '',
      image: image || null,
      featured: featured || false,
      order: order || 0,
    });

    // Add project reference to portfolio
    const portfolio = await Portfolio.findOne({ docId: 'main' });
    if (portfolio) {
      portfolio.projects.push(project._id);
      await portfolio.save();
    }

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { title, description, technologies, github, live, image, featured, order } = req.body;

    project.title = title || project.title;
    project.description = description !== undefined ? description : project.description;
    project.technologies = technologies || project.technologies;
    project.github = github !== undefined ? github : project.github;
    project.live = live !== undefined ? live : project.live;
    project.image = image !== undefined ? image : project.image;
    project.featured = featured !== undefined ? featured : project.featured;
    project.order = order !== undefined ? order : project.order;

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();

    // Remove project reference from portfolio
    const portfolio = await Portfolio.findOne({ docId: 'main' });
    if (portfolio) {
      portfolio.projects = portfolio.projects.filter(
        p => p.toString() !== req.params.id
      );
      await portfolio.save();
    }

    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;