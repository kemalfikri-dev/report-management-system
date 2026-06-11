import { Request, Response } from "express";
import { Category } from "@prisma/client";
import { prisma } from "../../lib/db";

// --Create Reports --
export const createReport = async (req: Request, res: Response) => {
  try {
    const { title, description, category } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }

    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ error: "Kolom title, description, dan category wajib diisi!" });
    }

    const validCategories = Object.values(Category);
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Kategori laporan tidak valid!" });
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

    const myReports = await prisma.report.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (myReports.length === 0) {
      return res.status(200).json({ message: "Laporan Kosong!" });
    }

    return res.status(200).json(myReports);
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
    const { title, description, category } = req.body;
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

    if (!title || !description || !category) {
      return res.status(400).json({
        error: "Semua field wajib diisi",
      });
    }

    const validCategories = Object.values(Category);
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Kategori laporan tidak valid!" });
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
