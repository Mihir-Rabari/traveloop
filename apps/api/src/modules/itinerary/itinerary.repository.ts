import { prisma } from "../../lib/prisma";

export class ItineraryRepository {
  // Stops
  async createStop(data: any) {
    return prisma.tripStop.create({ data });
  }

  async updateStop(id: string, data: any) {
    return prisma.tripStop.update({ where: { id }, data });
  }

  async deleteStop(id: string) {
    return prisma.tripStop.delete({ where: { id } });
  }

  async findStopById(id: string) {
    return prisma.tripStop.findUnique({
      where: { id },
      include: { trip: true },
    });
  }

  async reorderStops(tripId: string, stopIds: string[]) {
    return prisma.$transaction(
      stopIds.map((id, index) =>
        prisma.tripStop.update({
          where: { id },
          data: { order: index },
        })
      )
    );
  }

  // Activities
  async createActivity(data: any) {
    return prisma.activity.create({ data });
  }

  async updateActivity(id: string, data: any) {
    return prisma.activity.update({ where: { id }, data });
  }

  async deleteActivity(id: string) {
    return prisma.activity.delete({ where: { id } });
  }

  async findActivityById(id: string) {
    return prisma.activity.findUnique({
      where: { id },
      include: { stop: { include: { trip: true } } },
    });
  }
}

export const itineraryRepository = new ItineraryRepository();
