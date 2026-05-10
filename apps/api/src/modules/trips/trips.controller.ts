import { Request, Response } from "express";
import { tripsService } from "./trips.service";
import { sendResponse } from "../../utils/response-handler";
import { asyncHandler } from "../../utils/async-handler";

export class TripsController {
  getMyTrips = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const trips = await tripsService.getAllUserTrips(userId);
    return sendResponse(res, 200, "Trips retrieved successfully", trips);
  });

  getTrip = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user?.userId; // Optional userId for public trips
    const trip = await tripsService.getTripDetails(id, userId || "");
    return sendResponse(res, 200, "Trip details retrieved successfully", trip);
  });

  createTrip = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const trip = await tripsService.createTrip(userId, req.body);
    return sendResponse(res, 201, "Trip created successfully", trip);
  });

  updateTrip = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user!.userId;
    const trip = await tripsService.updateTrip(id, userId, req.body);
    return sendResponse(res, 200, "Trip updated successfully", trip);
  });

  deleteTrip = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user!.userId;
    await tripsService.deleteTrip(id, userId);
    return sendResponse(res, 200, "Trip deleted successfully");
  });

  getPublicTrips = asyncHandler(async (req: Request, res: Response) => {
    const trips = await tripsService.getPublicTrips();
    return sendResponse(res, 200, "Public trips retrieved successfully", trips);
  });
}

export const tripsController = new TripsController();
