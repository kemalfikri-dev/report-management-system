import { z } from "zod";

export const createReportSchema = z.object({
  title: z.string().min(5, "Judul laporan minimal 5 karakter").max(100, "Judul maksimal 100 karakter"),
  description: z.string().min(10, "Deskripsi laporan minimal 10 karakter"),
  category: z.enum(["BUG", "FEATURE", "COMPLAINT", "MAINTENANCE"], {
    message: "Kategori laporan tidak valid",
  }),
});

export const updateReportSchema = z.object({
  title: z.string().min(5, "Judul laporan minimal 5 karakter").max(100, "Judul maksimal 100 karakter"),
  description: z.string().min(10, "Deskripsi laporan minimal 10 karakter"),
  category: z.enum(["BUG", "FEATURE", "COMPLAINT", "MAINTENANCE"], {
    message: "Kategori laporan tidak valid",
  }),
});

export const updateReportStatusSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"], {
    message: "Status tidak valid",
  }),
  rejectReason: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.status === "REJECTED" && (!data.rejectReason || data.rejectReason.trim().length === 0)) {
    ctx.addIssue({
      code: "custom",
      message: "Alasan penolakan wajib diisi jika status REJECTED",
      path: ["rejectReason"],
    });
  }
});

