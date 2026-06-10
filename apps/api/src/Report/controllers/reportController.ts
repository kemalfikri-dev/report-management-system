import { Request, Response } from "express";
import { prisma } from "../../lib/db";


// --Create Reports --
export const createReport = async (req: Request, res: Response) => {
  try {
    const { title, description, category,} = req.body;

    const userId = req.user?.id

    if (!userId) {
  return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }

    await prisma.report.create({
      data: {
        title, 
        description,
        category,
        status : "PENDING",
        userId: userId
      },
    });

    if (!title || !description || !category) {
  return res.status(400).json({ error: "Kolom title, description, dan category wajib diisi!" });
  }

  const validCategories = ["BUG", "FEATURE", "COMPLAINT", "MAINTENANCE"];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: "Kategori laporan tidak valid!" });
  }

    return res.status(201).json({
      message: "Report berhasil dibuat",

    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({error: 'Terjadi kesalahan, tidak dapat membuat report'})
  }
}

// -- Show Reports -- 
export const showReport = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id

    if (!userId) {
  return res.status(401).json({ message: "Unauthorized: Missing user ID" });
}
    
    const myReports = await prisma.report.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
     
    })

    if(myReports.length === 0) {
      return res.status(404).json({message: 'Laporan Kosong!'})
    }

     return res.status(200).json(myReports); 
  }
  catch(err) {
    console.log(err);
    res.status(500).json({message: 'Gagal mengambil laporan Anda'})
  }
}

// -- Show Reports by Id --
export const reportById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id

    if (!userId) {
  return res.status(401).json({ message: "Unauthorized: Missing user ID" });
  }
    const reportId = req.params.id

    if (!reportId || typeof reportId !== 'string') {
      return res.status(400).json({ message: "Bad Request: Invalid Report ID" });
    }
    const myReportId = await prisma.report.findFirst({
      where: {
        userId: userId,
        id: reportId
      }
    });
    
    if(!myReportId) {
      return res.status(404).json({message: 'Laporan Kosong!'})
    }

    return res.status(200).json(myReportId)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({message: 'Gagal mengambil laporan Anda'})
  }
}

