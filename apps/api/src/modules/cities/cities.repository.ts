import { prisma } from "../../lib/prisma";

export class CitiesRepository {
  async search(query: string) {
    return prisma.tripStop.findMany({
      where: {
        location: { contains: query, mode: "insensitive" },
      },
      distinct: ["location"],
      take: 10,
    });
  }

  // In a real app, we'd have a City model. For now, we'll use tripStop locations or a static list.
  // I'll add a placeholder for future City model or use hardcoded popular cities.
  async getPopularCities() {
    return [
      { id: "1", name: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
      { id: "2", name: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf" },
      { id: "3", name: "New York", country: "USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9" },
      { id: "4", name: "London", country: "UK", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad" },
      { id: "5", name: "Rome", country: "Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5" },
    ];
  }
}

export const citiesRepository = new CitiesRepository();
