import { Request, Response } from "express";
import { Category } from "@prisma/client";
import { prisma } from "../lib/db";
import { z } from "zod";
import {
  createReportSchema,
  updateReportSchema,
  updateReportStatusSchema,
} from "../validators/report.validator";

// -- USER REPORT --//

// --Create Reports --
export const createReport = async (req: Request, res: Response) => {
  try {
    const validatedData = createReportSchema.parse(req.body);
    const { title, description, category } = validatedData;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }

    await prisma.report.create({
      data: {
        title,
        description,
        category,
        status: "PENDING",
        userId: userId,
      },
    });

    return res.status(201).json({
      message: "Report berhasil dibuat",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.issues[0].message });
    }
    console.log(err);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan, tidak dapat membuat report" });
  }
};

// -- Show Reports --
export const showReport = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const category = req.query.category as string;
    const status = req.query.status as string;

    const skip = (page - 1) * limit;
    const where: any = { userId };

    if (category && category !== "ALL") where.category = category;
    if (status && status !== "ALL") where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [myReports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.report.count({ where }),
    ]);

    return res.status(200).json({
      data: myReports,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Gagal mengambil laporan Anda" });
  }
};

// -- Show Reports by Id --
export const reportById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }
    const reportId = req.params.id;

    if (!reportId || typeof reportId !== "string") {
      return res
        .status(400)
        .json({ message: "Bad Request: Invalid Report ID" });
    }
    const myReportId = await prisma.report.findFirst({
      where: {
        userId: userId,
        id: reportId,
      },
    });

    if (!myReportId) {
      return res.status(404).json({ message: "Laporan Kosong!" });
    }

    return res.status(200).json(myReportId);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Gagal mengambil laporan Anda" });
  }
};

// -- Update Report --
export const updateReport = async (req: Request, res: Response) => {
  try {
    const validatedData = updateReportSchema.parse(req.body);
    const { title, description, category } = validatedData;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }
    const reportId = req.params.id;

    if (!reportId || typeof reportId !== "string") {
      return res
        .status(400)
        .json({ message: "Bad Request: Invalid Report ID" });
    }

    const report = await prisma.report.findFirst({
      where: {
        id: reportId,
        userId,
      },
    });

    if (!report) {
      return res.status(404).json({
        message: "Laporan tidak ditemukan",
      });
    }

    const updatedReport = await prisma.report.update({
      where: {
        id: reportId,
      },
      data: {
        title,
        description,
        category,
      },
    });

    return res.status(200).json({
      message: "Report berhasil diUpdate",
      updatedReport,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.issues[0].message });
    }
    console.log(err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengubah laporan!" });
  }
};

// -- Delete Report --
export const deleteReport = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }
    const reportId = req.params.id;

    if (!reportId || typeof reportId !== "string") {
      return res
        .status(400)
        .json({ message: "Bad Request: Invalid Report ID" });
    }

    const report = await prisma.report.findFirst({
      where: {
        id: reportId,
        userId,
      },
    });

    if (!report) {
      return res.status(404).json({
        message: "Laporan tidak ditemukan",
      });
    }

    const deletedReport = await prisma.report.delete({
      where: {
        id: reportId,
      },
    });

    return res.status(200).json({
      message: "Laporan berhasil dihapus",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus laporan" });
  }
};

// -- ADMIN REPORT --//

// -- Get All Report --
export const adminReportList = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const category = req.query.category as string;
    const status = req.query.status as string;

    const skip = (page - 1) * limit;
    const where: any = {};

    if (category && category !== "ALL") where.category = category;
    if (status && status !== "ALL") where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [allReports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      }),
      prisma.report.count({ where }),
    ]);

    return res.status(200).json({
      data: allReports,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Gagal mengambil laporan Anda" });
  }
};

// -- Update Report Status (Approve/Reject) --
export const updateReportStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }

    const reportId = req.params.id;

    if (!reportId || typeof reportId !== "string") {
      return res
        .status(400)
        .json({ message: "Bad Request: Invalid Report ID" });
    }

    const validatedData = updateReportStatusSchema.parse(req.body);
    const { status, rejectReason } = validatedData;

    const updatedReport = await prisma.report.update({
      where: {
        id: reportId,
      },
      data: {
        status: status,
        rejectReason: status === "REJECTED" ? rejectReason : null,
      },
    });

    return res.status(200).json({
      message: `Report berhasil di-${status.toLowerCase()}`,
      updatedReport,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.issues[0].message });
    }
    console.log(err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengubah status laporan!" });
  }
};
