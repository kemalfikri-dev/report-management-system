import { Request, Response } from "express";
import { prisma } from "../lib/db";

export const dashboard = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isAdmin = user.role === "ADMIN";
    const whereClause = isAdmin ? {} : { userId: user.id };

    const [total, pending, approved, rejected, recentReports] = await Promise.all([
      prisma.report.count({ where: whereClause }),
      prisma.report.count({ where: { ...whereClause, status: "PENDING" } }),
      prisma.report.count({ where: { ...whereClause, status: "APPROVED" } }),
      prisma.report.count({ where: { ...whereClause, status: "REJECTED" } }),
      prisma.report.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          status: true,
          category: true,
          createdAt: true,
        },
      }),
    ]);

    res.status(200).json({
      message: "Dashboard stats fetched successfully",
      stats: { total, pending, approved, rejected },
      recentReports,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
