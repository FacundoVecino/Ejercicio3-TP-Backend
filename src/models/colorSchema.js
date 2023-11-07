import mongoose from 'mongoose';

const Color = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hexadecimal: {
    type: String,
    required: true,
  },
  rgbOrRgba: {
    type: String,
    required: true,
  },
  isActive: Boolean,
});

export default mongoose.model('Colors', Color);
