import mongoose from "mongoose";

// MongoDB connection URL and options
const url = "mongodb://127.0.0.1:27017/Netflix";
const dbOptions = {
  useNewUrlParser: true,        // Use new URL parser
  useUnifiedTopology: true,     // Use new Server Discovery and Monitoring engine
};

/**
 * Initializes the MongoDB connection.
 * 
 * This function connects to the MongoDB database using the provided URL and options.
 * It handles successful connections and reconnection attempts in case of errors.
 */
function initConnection() {
  mongoose
    .connect(url, dbOptions)
    .then(() => {
      console.log("Successful connection to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      // Attempt to reconnect after a delay
      setTimeout(initConnection, 5000); // Retry connection after 5 seconds
    });
}

export { initConnection };
