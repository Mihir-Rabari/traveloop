import { Request, Response } from "express";
import { budgetsService } from "./budgets.service";
import { sendResponse } from "../../utils/response-handler";
import { asyncHandler } from "../../utils/async-handler";

export class BudgetsController {
  getBudget = asyncHandler(async (req: Request, res: Response) => {
    const { tripId } = req.params;
    const userId = req.user?.userId;
    const result = await budgetsService.getTripBudget(tripId, userId || "");
    return sendResponse(res, 200, "Budget retrieved successfully", result);
  });

  updateBudget = asyncHandler(async (req: Request, res: Response) => {
    const { tripId } = req.params;
    const userId = req.user!.userId;
    const budget = await budgetsService.updateBudget(tripId, userId, req.body);
    return sendResponse(res, 200, "Budget updated successfully", budget);
  });

  addExpense = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const expense = await budgetsService.addExpense(userId, req.body);
    return sendResponse(res, 201, "Expense added successfully", expense);
  });

  deleteExpense = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.userId;
    await budgetsService.deleteExpense(id, userId);
    return sendResponse(res, 200, "Expense deleted successfully");
  });

  getCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await budgetsService.getCategories();
    return sendResponse(res, 200, "Categories retrieved successfully", categories);
  });
}

export const budgetsController = new BudgetsController();
