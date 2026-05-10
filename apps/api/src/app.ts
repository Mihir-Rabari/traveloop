import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes";
import tripsRoutes from "./modules/trips/trips.routes";
import itineraryRoutes from "./modules/itinerary/itinerary.routes";
import citiesRoutes from "./modules/cities/cities.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

dotenv.config({ path: "../../.env" });

const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/cities", citiesRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy", data: { timestamp: new Date().toISOString() } });
});

// Error handling
app.use(errorMiddleware);

export default app;
