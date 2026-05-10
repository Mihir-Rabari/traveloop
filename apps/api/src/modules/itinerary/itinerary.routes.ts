import { Router } from "express";
import { itineraryController } from "./itinerary.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  createStopSchema,
  updateStopSchema,
  createActivitySchema,
  updateActivitySchema,
} from "./itinerary.validators";

const router = Router();

router.use(authenticate);

// Stops
router.post("/stops", validate(createStopSchema), itineraryController.addStop);
router.patch("/stops/:id", validate(updateStopSchema), itineraryController.updateStop);
router.delete("/stops/:id", itineraryController.deleteStop);
router.post("/stops/reorder", itineraryController.reorderStops);

// Activities
router.post("/activities", validate(createActivitySchema), itineraryController.addActivity);
router.patch("/activities/:id", validate(updateActivitySchema), itineraryController.updateActivity);
router.delete("/activities/:id", itineraryController.deleteActivity);

export default router;
