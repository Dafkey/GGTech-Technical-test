import express from "express";
import { platformController } from "../controllers/platformController";

const router = express.Router();

/**
 * @route POST /platforms
 * @description Create a new platform
 * @access Public
 */
router.post("/", platformController.createPlatform);

export default router;
