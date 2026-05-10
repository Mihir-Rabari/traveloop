import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { itineraryService } from "../services/itinerary.service";

export const useItinerary = () => {
  const queryClient = useQueryClient();

  const useStopsQuery = (tripId: string) =>
    useQuery({
      queryKey: ["itinerary", "stops", tripId],
      queryFn: () => itineraryService.getStops(tripId),
      enabled: !!tripId,
    });

  const useCreateStopMutation = () =>
    useMutation({
      mutationFn: (data: any) => itineraryService.createStop(data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["itinerary", "stops", variables.tripId] });
      },
    });

  const useUpdateStopMutation = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) => itineraryService.updateStop(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["itinerary", "stops"] });
      },
    });

  const useDeleteStopMutation = () =>
    useMutation({
      mutationFn: (id: string) => itineraryService.deleteStop(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["itinerary", "stops"] });
      },
    });

  const useCreateActivityMutation = () =>
    useMutation({
      mutationFn: (data: any) => itineraryService.createActivity(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["itinerary", "stops"] });
      },
    });

  const useUpdateActivityMutation = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) => itineraryService.updateActivity(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["itinerary", "stops"] });
      },
    });

  const useDeleteActivityMutation = () =>
    useMutation({
      mutationFn: (id: string) => itineraryService.deleteActivity(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["itinerary", "stops"] });
      },
    });

  return {
    useStopsQuery,
    useCreateStopMutation,
    useUpdateStopMutation,
    useDeleteStopMutation,
    useCreateActivityMutation,
    useUpdateActivityMutation,
    useDeleteActivityMutation,
  };

};
