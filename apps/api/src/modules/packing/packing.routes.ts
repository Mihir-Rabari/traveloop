import { Router } from "express";
import { packingController } from "./packing.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  createChecklistSchema,
  addItemSchema,
  updateItemSchema,
} from "./packing.validators";

const router = Router();

router.use(authenticate);

router.get("/:tripId", packingController.getChecklists);
router.post("/", validate(createChecklistSchema), packingController.createChecklist);
router.delete("/:id", packingController.deleteChecklist);

router.post("/items", validate(addItemSchema), packingController.addItem);
router.patch("/items/:id", validate(updateItemSchema), packingController.updateItem);
router.delete("/items/:id", packingController.deleteItem);
router.post("/items/:id/toggle", packingController.toggleItem);

export default router;
