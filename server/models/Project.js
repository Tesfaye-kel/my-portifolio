import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  technologies: [String],
  github: { type: String, default: '' },
  live: { type: String, default: '' },
  image: { type: String, default: null },
  certificateImage: { type: String, default: null },
  certificateTitle: { type: String, default: 'Certificate' },
  features: { type: [String], default: [] },
  problem: { type: String, default: '' },
  solution: { type: String, default: '' },
  architecture: { type: String, default: '' },
  challenges: { type: String, default: '' },
  results: { type: String, default: '' },
  contribution: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

export default Project;