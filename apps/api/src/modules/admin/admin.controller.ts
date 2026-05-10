import { Request, Response } from "express";
import { adminRepository } from "./admin.repository";
import { sendResponse } from "../../utils/response-handler";
import { asyncHandler } from "../../utils/async-handler";

export class AdminController {
  getStats = asyncHandler(async (req: Request, res: Response) => {
    const stats = await adminRepository.getSystemStats();
    return sendResponse(res, 200, "Stats retrieved successfully", stats);
  });

  getRecentData = asyncHandler(async (req: Request, res: Response) => {
    const [users, trips] = await Promise.all([
      adminRepository.getRecentUsers(),
      adminRepository.getRecentTrips(),
    ]);
    return sendResponse(res, 200, "Recent data retrieved", { users, trips });
  });
}

export const adminController = new AdminController();
