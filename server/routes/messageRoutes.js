import express from 'express';
import Message from '../models/Message.js';
import Portfolio from '../models/Portfolio.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create message (contact form)
// @route   POST /api/messages
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email, and message' });
    }

    const newMessage = await Message.create({
      name,
      email,
      message,
      read: false,
    });

    // Add message reference to portfolio
    const portfolio = await Portfolio.findOne({ docId: 'main' });
    if (portfolio) {
      portfolio.messages.push(newMessage._id);
      await portfolio.save();
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private
router.put('/:id/read', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.read = true;
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.deleteOne();

    // Remove message reference from portfolio
    const portfolio = await Portfolio.findOne({ docId: 'main' });
    if (portfolio) {
      portfolio.messages = portfolio.messages.filter(
        m => m.toString() !== req.params.id
      );
      await portfolio.save();
    }

    res.json({ message: 'Message removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;