import { useQuery } from "@tanstack/react-query";
import { adminService } from "../services/admin.service";

export const useAdmin = () => {
  const useStatsQuery = () => {
    return useQuery({
      queryKey: ["admin-stats"],
      queryFn: adminService.getStats,
    });
  };

  const useUsersQuery = (params?: unknown) => {
    return useQuery({
      queryKey: ["admin-users", params],
      queryFn: () => adminService.getUsers(params),
    });
  };

  const useTripsQuery = (params?: unknown) => {
    return useQuery({
      queryKey: ["admin-trips", params],
      queryFn: () => adminService.getTrips(params),
    });
  };

  return {
    useStatsQuery,
    useUsersQuery,
    useTripsQuery,
  };
};
