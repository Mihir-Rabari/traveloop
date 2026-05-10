import { prisma } from "../../lib/prisma";
import crypto from "crypto";

export class PublicSharingRepository {
  async createShareToken(tripId: string, expiresAt?: Date) {
    const token = crypto.randomBytes(16).toString("hex");
    return prisma.sharedTrip.create({
      data: { tripId, token, expiresAt },
    });
  }

  async findByToken(token: string) {
    return prisma.sharedTrip.findUnique({
      where: { token },
      include: {
        trip: {
          include: {
            stops: {
              orderBy: { order: "asc" },
              include: { activities: { orderBy: { startTime: "asc" } } },
            },
            user: { select: { name: true } },
          },
        },
      },
    });
  }

  async deleteShareToken(token: string) {
    return prisma.sharedTrip.delete({ where: { token } });
  }

  async copyTrip(tripId: string, newUserId: string) {
    const originalTrip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        stops: {
          include: { activities: true },
        },
      },
    });

    if (!originalTrip) return null;

    return prisma.trip.create({
      data: {
        title: `Copy of ${originalTrip.title}`,
        description: originalTrip.description,
        startDate: originalTrip.startDate,
        endDate: originalTrip.endDate,
        userId: newUserId,
        stops: {
          create: originalTrip.stops.map((stop: any) => ({
            location: stop.location,
            order: stop.order,
            date: stop.date,
            notes: stop.notes,
            activities: {
              create: stop.activities.map((act: any) => ({
                title: act.title,
                description: act.description,
                startTime: act.startTime,
                endTime: act.endTime,
                cost: act.cost,
                location: act.location,
                category: act.category,
              })),
            },
          })),
        },
      },
    });
  }
}

export const publicSharingRepository = new PublicSharingRepository();
