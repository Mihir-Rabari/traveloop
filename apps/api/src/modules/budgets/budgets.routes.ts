import { Router } from "express";
import { budgetsController } from "./budgets.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createBudgetSchema, createExpenseSchema } from "./budgets.validators";

const router = Router();

router.use(authenticate);

router.get("/categories", budgetsController.getCategories);
router.get("/:tripId", budgetsController.getBudget);
router.put("/:tripId", validate(createBudgetSchema), budgetsController.updateBudget);
router.post("/expenses", validate(createExpenseSchema), budgetsController.addExpense);
router.delete("/expenses/:id", budgetsController.deleteExpense);

export default router;
