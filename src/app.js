import express from "express";
import bodyParser from "body-parser";
import { initConnection } from "./db/connection";
import movieRoutes from "./routes/movieRoutes";
import platformRoutes from "./routes/platformRoutes";
import reviewRoutes from "./routes/reviewRoutes";

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
initConnection();

// Set up routes for movies, platforms, and reviews
app.use("/movies", movieRoutes);
app.use("/platforms", platformRoutes);
app.use("/reviews", reviewRoutes);

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});