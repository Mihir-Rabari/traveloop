import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { packingService } from "../services/packing.service";

export const usePacking = (tripId: string) => {
  const queryClient = useQueryClient();

  const usePackingQuery = () =>
    useQuery({
      queryKey: ["packing", tripId],
      queryFn: () => packingService.getChecklist(tripId),
      enabled: !!tripId,
    });

  const useAddItemMutation = () =>
    useMutation({
      mutationFn: (data: { name: string; category?: string }) => 
        packingService.addItem({ ...data, tripId }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["packing", tripId] });
      },
    });

  const useToggleItemMutation = () =>
    useMutation({
      mutationFn: packingService.toggleItem,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["packing", tripId] });
      },
    });

  const useDeleteItemMutation = () =>
    useMutation({
      mutationFn: packingService.deleteItem,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["packing", tripId] });
      },
    });

  return {
    usePackingQuery,
    useAddItemMutation,
    useToggleItemMutation,
    useDeleteItemMutation,
  };
};
