import { prisma } from "../../lib/prisma";

export class CitiesRepository {
  async search(query: string) {
    return prisma.city.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { country: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        activities: true,
      },
      take: 10,
    });
  }

  async getPopularCities() {
    return prisma.city.findMany({
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        activities: true,
      },
    });
  }

  async getActivities(city: string) {
    const cityData = await prisma.city.findFirst({
      where: { name: { contains: city, mode: "insensitive" } },
      include: {
        activities: true,
      },
    });

    if (cityData) {
      return cityData.activities;
    }

    return [];
  }
}

export const citiesRepository = new CitiesRepository();
