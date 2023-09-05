import { Review } from "../models/Review.js";
import { Movie } from "../models/Movie.js";

/**
 * Create a new review and update the average score of the related movie.
 *
 * @param {object} req - Object of Express request.
 * @param {object} res - Express Response Object.
 * @returns {void}
 */
const createReview = async (req, res) => {
  try {
   // Get the review data from the body of the request.
    const reviewData = req.body;

    // Create a new review instance.
    const review = new Review(reviewData);

    // Save the review in the database.
    await review.save();

    // Get the ID of the related movie.
    const movieId = review.movie;

    // Get all reviews related to the movie.
    const reviews = await Review.find({ movie: movieId });

    // Calculate the new average score.
    const newScore = calculateAverageScore(reviews);

    // Update the movie score in the database.
    await Movie.findByIdAndUpdate(movieId, { score: newScore });

    // Reply with the created review.
    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Error creating review" });
  }
};

/**
 * Calculates the average score of an array of reviews.
 *
 * @param {Array} reviews - Review arrangement.
 * @returns {number|null} - Average score or null if no reviews.
 */
function calculateAverageScore(reviews) {
  if (reviews.length === 0) {
    return null;
  }

  // Add up all the scores of the reviews.
  const totalScore = reviews.reduce((accumulator, review) => accumulator + review.score, 0);

 // Calculate the average score and round it to two decimal places.
  const averageScore = totalScore / reviews.length;
  return parseFloat(averageScore.toFixed(2));
}


// Export the reviewController object with the functions
export const reviewController = {
  createReview
};