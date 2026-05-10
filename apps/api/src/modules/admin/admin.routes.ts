import { Router } from "express";
import { adminController } from "./admin.controller";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { UserRole } from "../auth/auth.types";

const router = Router();

router.use(authenticate, authorize("ADMIN"));

router.get("/stats", adminController.getStats);
router.get("/recent", adminController.getRecentData);

export default router;
