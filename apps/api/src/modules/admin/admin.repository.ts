import { prisma } from "../../lib/prisma";

export class AdminRepository {
  async getSystemStats() {
    const [userCount, tripCount, expenseCount] = await Promise.all([
      prisma.user.count(),
      prisma.trip.count(),
      prisma.expense.count(),
    ]);

    const totalSpent = await prisma.expense.aggregate({
      _sum: { amount: true },
    });

    return {
      users: userCount,
      trips: tripCount,
      expenses: expenseCount,
      totalSpent: totalSpent._sum.amount || 0,
    };
  }

  async getRecentUsers() {
    return prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, createdAt: true },
    });
  }

  async getRecentTrips() {
    return prisma.trip.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true } } },
    });
  }
}

export const adminRepository = new AdminRepository();
