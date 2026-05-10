import { Router } from "express";
import { tripsController } from "./trips.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createTripSchema, updateTripSchema } from "./trips.validators";

const router = Router();

// Public routes
router.get("/public", tripsController.getPublicTrips);

// Protected routes
router.use(authenticate);

router.get("/", tripsController.getMyTrips);
router.get("/:id", tripsController.getTrip);
router.post("/", validate(createTripSchema), tripsController.createTrip);
router.patch("/:id", validate(updateTripSchema), tripsController.updateTrip);
router.delete("/:id", tripsController.deleteTrip);
router.post("/:id/share", tripsController.shareTrip);

export default router;
