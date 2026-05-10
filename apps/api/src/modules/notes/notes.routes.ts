import { Router } from "express";
import { notesController } from "./notes.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createNoteSchema, updateNoteSchema } from "./notes.validators";

const router = Router();

router.use(authenticate);

router.get("/:tripId", notesController.getNotes);
router.post("/", validate(createNoteSchema), notesController.createNote);
router.patch("/:id", validate(updateNoteSchema), notesController.updateNote);
router.delete("/:id", notesController.deleteNote);

export default router;
