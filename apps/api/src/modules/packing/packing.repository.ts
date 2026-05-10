import { prisma } from "../../lib/prisma";

export class PackingRepository {
  async getChecklists(tripId: string) {
    return prisma.packingChecklist.findMany({
      where: { tripId },
      include: { items: { orderBy: { createdAt: "asc" } } },
    });
  }

  async createChecklist(data: any) {
    return prisma.packingChecklist.create({
      data,
      include: { items: true },
    });
  }

  async deleteChecklist(id: string) {
    return prisma.packingChecklist.delete({ where: { id } });
  }

  async addItem(data: any) {
    return prisma.packingItem.create({ data });
  }

  async updateItem(id: string, data: any) {
    return prisma.packingItem.update({ where: { id }, data });
  }

  async deleteItem(id: string) {
    return prisma.packingItem.delete({ where: { id } });
  }

  async findChecklistById(id: string) {
    return prisma.packingChecklist.findUnique({
      where: { id },
      include: { trip: true },
    });
  }

  async findItemById(id: string) {
    return prisma.packingItem.findUnique({
      where: { id },
      include: { checklist: { include: { trip: true } } },
    });
  }
}

export const packingRepository = new PackingRepository();
