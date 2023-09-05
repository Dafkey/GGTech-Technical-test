import { Movie } from "../models/Movie.js";
import { Review } from "../models/Review.js";

/**
 * Creates a new movie.
 *
 * @param {object} req - Express request object containing movie data.
 * @param {object} res - Express response object.
 */
const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error("Error creating the movie:", error);
    res.status(400).json({ error: "The movie could not be created." });
  }
};

/**
 * Updates a movie by its ID.
 *
 * @param {object} req - Express request object containing the movie ID and updated data.
 * @param {object} res - Express response object.
 */
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error updating the movie:", error);
    res.status(400).json({ error: "Error updating the movie." });
  }
};

/**
 * Deletes a movie by its ID.
 *
 * @param {object} req - Express request object containing the movie ID to delete.
 * @param {object} res - Express response object.
 */
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting the movie:", error);
    res.status(400).json({ error: "Error deleting the movie." });
  }
};

/**
 * Gets all movies with pagination.
 *
 * @param {object} req - Express request object that may contain pagination parameters (page, perPage).
 * @param {object} res - Express response object.
 */
const getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default is page 1
    const perPage = parseInt(req.query.perPage) || 10; // Number of items per page, default is 10

    // Calculate how many items to skip in the query
    const skip = (page - 1) * perPage;

    // Query the database to get movies with pagination
    const data = await Movie.find()
      .skip(skip) // Skip previous items on the current page
      .limit(perPage); // Limit the number of items per page
    const response = { data, skip, perPage, page };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Error retrieving movies." });
  }
};

/**
 * Reads a movie by its ID with reviews grouped by platform.
 *
 * @param {object} req - Express request object containing the movie ID.
 * @param {object} res - Express response object.
 */
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }

    // Use MongoDB aggregation to group reviews by platform
    const reviews = await Review.aggregate([
      {
        $match: { movie: movie._id },
      },
      {
        $lookup: {
          from: "platforms",
          localField: "platforms",
          foreignField: "_id",
          as: "platformInfo",
        },
      },
      {
        $unwind: "$platformInfo",
      },
      {
        $group: {
          _id: "$platformInfo.title",
          reviews: { $push: "$$ROOT" },
        },
      },
    ]);

    res.status(200).json({movie, reviews});
  } catch (error) {
    console.error("Error when displaying the movie:", error);
    res.status(500).json({ error: "Error retrieving the movie." });
  }
};

/**
 * Duplicates a movie with a new ID.
 *
 * @param {object} req - Express request object containing the original movie's ID.
 * @param {object} res - Express response object.
 */
const duplicateMovie = async (req, res) => {
  try {
    // Get the original movie by its ID
    const originalMovie = await Movie.findById(req.params.id);
    if (!originalMovie) {
      return res.status(404).json({ error: "Original movie not found." });
    }

    // Create a new movie based on the data of the original movie
    const newMovieData = {
      title: originalMovie.title,
      slug: originalMovie.slug,
      image: originalMovie.image,
      director: originalMovie.director,
      platforms: [],
      score: originalMovie.score,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Create the new movie with a different ID
    const newMovie = new Movie(newMovieData);
    await newMovie.save();

    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error when duplicating the movie:", error);
    res.status(500).json({ error: "Error when duplicating the movie." });
  }
};

// Export the movieController object with the functions
export const movieController = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getMovieById,
  duplicateMovie
};
