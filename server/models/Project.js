import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  technologies: [String],
  github: { type: String, default: '' },
  live: { type: String, default: '' },
  image: { type: String, default: null },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

export default Project;