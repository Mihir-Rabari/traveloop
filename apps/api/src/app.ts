import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";

import authRoutes from "./modules/auth/auth.routes";
import tripsRoutes from "./modules/trips/trips.routes";
import itineraryRoutes from "./modules/itinerary/itinerary.routes";
import citiesRoutes from "./modules/cities/cities.routes";
import budgetsRoutes from "./modules/budgets/budgets.routes";
import packingRoutes from "./modules/packing/packing.routes";
import notesRoutes from "./modules/notes/notes.routes";
import publicSharingRoutes from "./modules/public-sharing/public-sharing.routes";
import adminRoutes from "./modules/admin/admin.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

dotenv.config({ path: "../../.env" });

const app = express();

// Rate Limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 500, // Relaxed for testing
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Relaxed for testing
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { success: false, message: "Too many authentication attempts, please try again later." },
});

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(generalLimiter);
app.use("/api/auth", authLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/cities", citiesRoutes);
app.use("/api/budgets", budgetsRoutes);
app.use("/api/packing", packingRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/share", publicSharingRoutes);
app.use("/api/admin", adminRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy", data: { timestamp: new Date().toISOString() } });
});

// Error handling
app.use(errorMiddleware);

export default app;
