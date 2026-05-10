import { Request, Response } from "express";
import { packingService } from "./packing.service";
import { sendResponse } from "../../utils/response-handler";
import { asyncHandler } from "../../utils/async-handler";

export class PackingController {
  getChecklists = asyncHandler(async (req: Request, res: Response) => {
    const tripId = req.params.tripId as string;
    const userId = req.user?.userId;
    const checklists = await packingService.getTripChecklists(tripId, userId || "");
    return sendResponse(res, 200, "Checklists retrieved successfully", checklists);
  });

  createChecklist = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const checklist = await packingService.createChecklist(userId, req.body);
    return sendResponse(res, 201, "Checklist created successfully", checklist);
  });

  deleteChecklist = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user!.userId;
    await packingService.deleteChecklist(id, userId);
    return sendResponse(res, 200, "Checklist deleted successfully");
  });

  addItem = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const item = await packingService.addItem(userId, req.body);
    return sendResponse(res, 201, "Item added successfully", item);
  });

  updateItem = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user!.userId;
    const item = await packingService.updateItem(id, userId, req.body);
    return sendResponse(res, 200, "Item updated successfully", item);
  });

  deleteItem = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user!.userId;
    await packingService.deleteItem(id, userId);
    return sendResponse(res, 200, "Item deleted successfully");
  });
}

export const packingController = new PackingController();
