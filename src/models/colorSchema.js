import mongoose from 'mongoose';

const Color = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  hexagecimal: {
    type: String,
    required: true,
    unique: true,
  },
  rgbOrRgba: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: Boolean,
});

export default mongoose.model('Colors', Color);
