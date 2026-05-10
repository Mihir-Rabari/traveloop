import { Router } from "express";
import { publicSharingController } from "./public-sharing.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

// Public route
router.get("/:token", publicSharingController.getSharedTrip);

// Protected routes
router.use(authenticate);
router.post("/share", publicSharingController.shareTrip);
router.post("/copy", publicSharingController.copyTrip);

export default router;
