import { useQuery } from "@tanstack/react-query";
import { citiesService } from "../services/cities.service";

export const useCities = () => {
  const useCitiesQuery = () =>
    useQuery({
      queryKey: ["cities", "all"],
      queryFn: () => citiesService.getAllCities(),
    });

  const useSearchCitiesQuery = (query: string) =>
    useQuery({
      queryKey: ["cities", "search", query],
      queryFn: () => citiesService.searchCities(query),
      enabled: query.length > 2,
    });

  const usePopularCitiesQuery = () =>
    useQuery({
      queryKey: ["cities", "popular"],
      queryFn: () => citiesService.getPopularCities(),
    });

  return {
    useCitiesQuery,
    useSearchCitiesQuery,
    usePopularCitiesQuery,
  };
};
