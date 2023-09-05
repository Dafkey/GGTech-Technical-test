import mongoose from 'mongoose';

/**
 * Platform model.
 * @class Platform
 */
const platformSchema = new mongoose.Schema({
  /** Platform icon. */
  icon: {
    type: String,
    required: true,
  },
  /** Platform title. */
  title: {
    type: String,
    required: true,
    unique: true,
  },
  /** Date of creation of the platform. */
  createdAt: {
    type: Date,
    default: Date.now,
  },
  /** Date of last platform update. */
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Function to automate the createdAt and updatedAt platforms
platformSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }
  next();
});

/**
 * Platform model.
 * @typedef {Model} Platform
 */
export const Platform = mongoose.model('Platform', platformSchema);
