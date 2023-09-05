import mongoose from 'mongoose';
import slugify from "slugify";

/**
 * Movie model.
 * @class Movie
 */
const movieSchema = new mongoose.Schema({
  /** Title of the movie. */
  title: {
    type: String,
    required: true,
  },
  /** Movie Slug. */
  slug: {
    type: String,
    required: false,
    unique: true,
  },
  /** URL of the movie image. */
  image: {
    type: String,
    required: true,
  },
  /** Director of the movie. */
  director: {
    type: String,
    required: true,
  },
  /** Platforms on which the movie is available. */
  platforms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Platform',
    },
  ],
  /** Movie score. */
  score: {
    type: Number,
    required: false,
    default: null,
  },
  /** Date of creation of the movie. */
  createdAt: {
    type: Date,
    default: Date.now,
  },
  /** Date of last movie update. */
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Function to automate the createdAt and updatedAt fields
movieSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }
  next();
});

// Function to automate the creation of slugs
movieSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    return next();
  }
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Function to update updatedAt before findOneAndUpdate and update
movieSchema.pre(["findOneAndUpdate", "update"], function (next) {
  this.updatedAt = new Date();
  next();
});

/**
 * Movie model.
 * @typedef {Model} Movie
 */
export const Movie = mongoose.model('Movie', movieSchema);

