import { Request, Response } from "express";
import { itineraryService } from "./itinerary.service";
import { sendResponse } from "../../utils/response-handler";
import { asyncHandler } from "../../utils/async-handler";

export class ItineraryController {
  // Stops
  addStop = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const stop = await itineraryService.addStop(userId, req.body);
    return sendResponse(res, 201, "Stop added successfully", stop);
  });

  updateStop = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.userId;
    const stop = await itineraryService.updateStop(id, userId, req.body);
    return sendResponse(res, 200, "Stop updated successfully", stop);
  });

  deleteStop = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.userId;
    await itineraryService.deleteStop(id, userId);
    return sendResponse(res, 200, "Stop deleted successfully");
  });

  reorderStops = asyncHandler(async (req: Request, res: Response) => {
    const { tripId, stopIds } = req.body;
    const userId = req.user!.userId;
    await itineraryService.reorderStops(tripId, userId, stopIds);
    return sendResponse(res, 200, "Stops reordered successfully");
  });

  // Activities
  addActivity = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const activity = await itineraryService.addActivity(userId, req.body);
    return sendResponse(res, 201, "Activity added successfully", activity);
  });

  updateActivity = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.userId;
    const activity = await itineraryService.updateActivity(id, userId, req.body);
    return sendResponse(res, 200, "Activity updated successfully", activity);
  });

  deleteActivity = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.userId;
    await itineraryService.deleteActivity(id, userId);
    return sendResponse(res, 200, "Activity deleted successfully");
  });
}

export const itineraryController = new ItineraryController();
