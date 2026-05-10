import { Router } from "express";
import { adminController } from "./admin.controller";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { UserRole } from "@prisma/client";

const router = Router();

router.use(authenticate, authorize([UserRole.ADMIN]));

router.get("/stats", adminController.getStats);
router.get("/recent", adminController.getRecentData);

export default router;
