import dotenv from "dotenv";
import connectToDb from "./src/config/db.js";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to DB
    console.log("Connecting to MongoDB...");
    await connectToDb();
    console.log("Mongodb Connected");
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {}
};

startServer();
