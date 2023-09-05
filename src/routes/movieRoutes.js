import express from "express";
import { movieController } from "../controllers/movieController";

const router = express.Router();

/**
 * @route POST /movies
 * @description Create a new movie
 * @access Public
 */
router.post("/", movieController.createMovie);

/**
 * @route GET /movies
 * @description Get all movies with pagination
 * @access Public
 */
router.get("/", movieController.getMovies);

/**
 * @route GET /movies/:id
 * @description Get a movie by its ID with reviews grouped by platform
 * @access Public
 */
router.get("/:id", movieController.getMovieById);

/**
 * @route PUT /movies/:id
 * @description Update a movie by its ID
 * @access Public
 */
router.put("/:id", movieController.updateMovie);

/**
 * @route DELETE /movies/:id
 * @description Delete a movie by its ID
 * @access Public
 */
router.delete("/:id", movieController.deleteMovie);

/**
 * @route POST /movies/duplicate/:id
 * @description Duplicate a movie with a new ID
 * @access Public
 */
router.post("/duplicate/:id", movieController.duplicateMovie);

export default router;
