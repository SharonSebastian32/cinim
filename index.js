import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/DatabaseConnection.js";
import bookingRoutes from "./routes/bookingroutes.js";
import morgan from "morgan";
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/cinimaticket", bookingRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
