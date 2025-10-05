import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/DatabaseConnection.js";
import bookingRoutes from "./routes/bookingroutes.js";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/cinimaticket", bookingRoutes);

// Connect to DB and start server only if successful
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });
