import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tripsService } from "../services/trips.service";

export const useTrips = () => {
  const queryClient = useQueryClient();

  const useTripsQuery = (params?: unknown) => {
    return useQuery({
      queryKey: ["trips", params],
      queryFn: () => tripsService.getTrips(params),
    });
  };

  const useTripDetailsQuery = (id: string) => {
    return useQuery({
      queryKey: ["trip", id],
      queryFn: () => tripsService.getTripById(id),
      enabled: !!id,
    });
  };

  const useCreateTripMutation = () => {
    return useMutation({
      mutationFn: tripsService.createTrip,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["trips"] });
      },
    });
  };

  const useUpdateTripMutation = (id: string) => {
    return useMutation({
      mutationFn: (data: unknown) => tripsService.updateTrip(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["trips"] });
        queryClient.invalidateQueries({ queryKey: ["trip", id] });
      },
    });
  };

  const useDeleteTripMutation = () => {
    return useMutation({
      mutationFn: tripsService.deleteTrip,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["trips"] });
      },
    });
  };

  const useShareTripMutation = (id: string) => {
    return useMutation({
      mutationFn: (email: string) => tripsService.shareTrip(id, email),
    });
  };

  return {
    useTripsQuery,
    useTripQuery: useTripDetailsQuery,
    useCreateTripMutation,
    useUpdateTripMutation,
    useDeleteTripMutation,
    useShareTripMutation,
  };

};
