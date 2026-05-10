import { itineraryRepository } from "./itinerary.repository";
import { ForbiddenError, NotFoundError } from "../../utils/errors";

export class ItineraryService {
  // Stops
  async addStop(userId: string, data: any) {
    // Verify trip ownership or access could be added here
    return itineraryRepository.createStop({
      ...data,
      date: data.date ? new Date(data.date) : null,
    });
  }

  async updateStop(stopId: string, userId: string, data: any) {
    const stop = await itineraryRepository.findStopById(stopId);
    if (!stop) throw new NotFoundError("Stop not found");
    if (stop.trip.userId !== userId) throw new ForbiddenError();

    const updateData = { ...data };
    if (data.date) updateData.date = new Date(data.date);

    return itineraryRepository.updateStop(stopId, updateData);
  }

  async deleteStop(stopId: string, userId: string) {
    const stop = await itineraryRepository.findStopById(stopId);
    if (!stop) throw new NotFoundError("Stop not found");
    if (stop.trip.userId !== userId) throw new ForbiddenError();

    return itineraryRepository.deleteStop(stopId);
  }

  async reorderStops(tripId: string, userId: string, stopIds: string[]) {
    // Add ownership check for tripId
    return itineraryRepository.reorderStops(tripId, stopIds);
  }

  // Activities
  async addActivity(userId: string, data: any) {
    return itineraryRepository.createActivity({
      ...data,
      startTime: data.startTime ? new Date(data.startTime) : null,
      endTime: data.endTime ? new Date(data.endTime) : null,
    });
  }

  async updateActivity(activityId: string, userId: string, data: any) {
    const activity = await itineraryRepository.findActivityById(activityId);
    if (!activity) throw new NotFoundError("Activity not found");
    if (activity.stop.trip.userId !== userId) throw new ForbiddenError();

    const updateData = { ...data };
    if (data.startTime) updateData.startTime = new Date(data.startTime);
    if (data.endTime) updateData.endTime = new Date(data.endTime);

    return itineraryRepository.updateActivity(activityId, updateData);
  }

  async deleteActivity(activityId: string, userId: string) {
    const activity = await itineraryRepository.findActivityById(activityId);
    if (!activity) throw new NotFoundError("Activity not found");
    if (activity.stop.trip.userId !== userId) throw new ForbiddenError();

    return itineraryRepository.deleteActivity(activityId);
  }
}

export const itineraryService = new ItineraryService();
