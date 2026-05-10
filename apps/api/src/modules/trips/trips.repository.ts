import { prisma } from "../../lib/prisma";

export class TripsRepository {
  async findById(id: string) {
    return prisma.trip.findUnique({
      where: { id },
      include: {
        stops: {
          orderBy: { order: "asc" },
          include: { activities: { orderBy: { startTime: "asc" } } },
        },
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.trip.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(userId: string, data: any) {
    return prisma.trip.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async update(id: string, data: any) {
    return prisma.trip.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.trip.delete({ where: { id } });
  }

  async findPublicTrips() {
    return prisma.trip.findMany({
      where: { visibility: "PUBLIC" },
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true } } },
    });
  }
}

export const tripsRepository = new TripsRepository();
