import { tripsRepository } from "./trips.repository";
import { ForbiddenError, NotFoundError } from "../../utils/errors";
import { mailService } from "../mail/services/mail.service";
import { prisma } from "../../lib/prisma";

export class TripsService {
  async getAllUserTrips(userId: string) {
    return tripsRepository.findByUserId(userId);
  }

  async getTripDetails(tripId: string, userId: string) {
    const trip = await tripsRepository.findById(tripId);
    if (!trip) throw new NotFoundError("Trip not found");

    if (trip.visibility === "PRIVATE" && trip.userId !== userId) {
      throw new ForbiddenError("You do not have access to this trip");
    }

    return trip;
  }

  async createTrip(userId: string, data: any) {
    return tripsRepository.create(userId, {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });
  }

  async updateTrip(tripId: string, userId: string, data: any) {
    const trip = await tripsRepository.findById(tripId);
    if (!trip) throw new NotFoundError("Trip not found");
    if (trip.userId !== userId) throw new ForbiddenError("You cannot edit this trip");

    const updateData = { ...data };
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.endDate) updateData.endDate = new Date(data.endDate);

    return tripsRepository.update(tripId, updateData);
  }

  async deleteTrip(tripId: string, userId: string) {
    const trip = await tripsRepository.findById(tripId);
    if (!trip) throw new NotFoundError("Trip not found");
    if (trip.userId !== userId) throw new ForbiddenError("You cannot delete this trip");

    return tripsRepository.delete(tripId);
  }

  async getPublicTrips() {
    return tripsRepository.findPublicTrips();
  }

  async shareTrip(tripId: string, userId: string, targetEmail: string) {
    const trip = await tripsRepository.findById(tripId);
    if (!trip) throw new NotFoundError("Trip not found");
    if (trip.userId !== userId) throw new ForbiddenError("You cannot share this trip");

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const senderName = user?.name || "A friend";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const shareLink = `${appUrl}/share/${tripId}`;

    await mailService.sendTripInvitationEmail(targetEmail, senderName, trip.title, shareLink);
    return { success: true };
  }
}

export const tripsService = new TripsService();
