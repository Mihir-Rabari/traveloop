import { useQuery } from "@tanstack/react-query";
import { shareService } from "../services/share.service";

export const useShare = () => {
  const usePublicTripQuery = (id: string) =>
    useQuery({
      queryKey: ["share", id],
      queryFn: () => shareService.getSharedTrip(id),
      enabled: !!id,
    });

  return {
    usePublicTripQuery,
  };
};
