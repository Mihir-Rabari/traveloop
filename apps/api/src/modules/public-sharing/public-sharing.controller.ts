import { Request, Response } from "express";
import { publicSharingRepository } from "./public-sharing.repository";
import { sendResponse } from "../../utils/response-handler";
import { asyncHandler } from "../../utils/async-handler";
import { NotFoundError } from "../../utils/errors";

export class PublicSharingController {
  shareTrip = asyncHandler(async (req: Request, res: Response) => {
    const { tripId, expiresAt } = req.body;
    const share = await publicSharingRepository.createShareToken(tripId, expiresAt ? new Date(expiresAt) : undefined);
    return sendResponse(res, 201, "Share token created", { token: share.token });
  });

  getSharedTrip = asyncHandler(async (req: Request, res: Response) => {
    const token = req.params.token as string;
    const share = await publicSharingRepository.findByToken(token);
    if (!share) throw new NotFoundError("Shared trip not found or expired");
    return sendResponse(res, 200, "Shared trip retrieved", share.trip);
  });

  copyTrip = asyncHandler(async (req: Request, res: Response) => {
    const { tripId } = req.body;
    const userId = req.user!.userId;
    const newTrip = await publicSharingRepository.copyTrip(tripId, userId);
    return sendResponse(res, 201, "Trip copied successfully", newTrip);
  });
}

export const publicSharingController = new PublicSharingController();
