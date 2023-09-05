import express from "express";
import { reviewController } from "../controllers/reviewController";

const router = express.Router();

/**
 * @route POST /reviews
 * @description Create a new review
 * @access Public
 */
router.post("/", reviewController.createReview);

export default router;
