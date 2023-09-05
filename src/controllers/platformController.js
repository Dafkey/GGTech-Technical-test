import { Platform } from "../models/Platform.js";

/**
 * Create a new platform.
 *
 * @param {object} req - Express request object containing the platform data.
 * @param {object} res - Express response object.
 * @returns {void}
 */
const createPlatform = async (req, res) => {
  try {
    // Get the platform data from the request body.
    const platformData = req.body;

    // Create a new instance of the platform.
    const platform = new Platform(platformData);

    // Save the platform in the database.
    await platform.save();

    // Reply with the platform created and a status code 201 (Created).
    res.status(201).json(platform);
  } catch (error) {
    console.error("Error al crear la plataforma:", error);

    // Respond with a status code 400 (Unsuccessful Request) and an error message.
    res.status(400).json({ error: "No se pudo crear la plataforma." });
  }
};

// Export the platformController object with the functions
export const platformController = {
  createPlatform
};
