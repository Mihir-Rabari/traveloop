import { packingRepository } from "./packing.repository";
import { ForbiddenError, NotFoundError } from "../../utils/errors";

export class PackingService {
  async getTripChecklists(tripId: string) {
    return packingRepository.getChecklists(tripId);
  }

  async createChecklist(userId: string, data: any) {
    return packingRepository.createChecklist(data);
  }

  async deleteChecklist(checklistId: string, userId: string) {
    const checklist = await packingRepository.findChecklistById(checklistId);
    if (!checklist) throw new NotFoundError("Checklist not found");
    if (checklist.trip.userId !== userId) throw new ForbiddenError();

    return packingRepository.deleteChecklist(checklistId);
  }

  async addItem(userId: string, data: any) {
    const checklist = await packingRepository.findChecklistById(data.checklistId);
    if (!checklist) throw new NotFoundError("Checklist not found");
    if (checklist.trip.userId !== userId) throw new ForbiddenError();

    return packingRepository.addItem(data);
  }

  async updateItem(itemId: string, userId: string, data: any) {
    const item = await packingRepository.findItemById(itemId);
    if (!item) throw new NotFoundError("Item not found");
    if (item.checklist.trip.userId !== userId) throw new ForbiddenError();

    return packingRepository.updateItem(itemId, data);
  }

  async deleteItem(itemId: string, userId: string) {
    const item = await packingRepository.findItemById(itemId);
    if (!item) throw new NotFoundError("Item not found");
    if (item.checklist.trip.userId !== userId) throw new ForbiddenError();

    return packingRepository.deleteItem(itemId);
  }
}

export const packingService = new PackingService();
