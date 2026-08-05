import express from "express";
import {
  adminReportList,
  createReport,
  deleteReport,
  reportById,
  showReport,
  updateReport,
  updateReportStatus,
} from "./report.controller";
import { verifyToken, verifyAdmin } from "../auth/auth.middleware";

const router = express.Router();

// -- USER REPORT ROUTE -- //

//-- Create Report --
router.post("/reports", verifyToken, createReport);

//-- Show Report --
router.get("/reports", verifyToken, showReport);
router.get("/reports/:id", verifyToken, reportById);

//-- Update Report --
router.put("/reports/:id", verifyToken, updateReport);

//-- Delete Report --
router.delete("/reports/:id", verifyToken, deleteReport);

// -- ADMIN REPORT ROUTE -- //
// -- Get All Report --
router.get("/admin/reports", verifyToken, verifyAdmin, adminReportList);

// -- Update Report Status --
router.patch("/admin/reports/:id/status", verifyToken, verifyAdmin, updateReportStatus);
export default router;
