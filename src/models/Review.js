import mongoose from "mongoose";

/**
 * Review model.
 * @class Review
 */
const reviewSchema = new mongoose.Schema({
  // Reference to the film to which the review belongs
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  
  // List of platforms associated with the review
  platforms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
    },
  ],

  // Name of the author of the review
  author: {
    type: String,
    required: true,
  },

  // Body or content of the review
  body: {
    type: String,
    required: true,
  },

  // Review score
  score: {
    type: Number,
    required: true,
  },

  // Date review created
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Date review updated
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Function to automate the createdAt and updatedAt platforms
reviewSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }
  next();
});

/**
 * Review model.
 * @typedef {Model} Platform
 */
export const Review = mongoose.model("Review", reviewSchema);