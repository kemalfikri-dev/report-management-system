import express from "express";
import {
  adminReportList,
  createReport,
  deleteReport,
  reportById,
  showReport,
  updateReport,
  approveReport,
} from "./report.controller";
import { verifyToken } from "../auth/auth.middleware";

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
router.get("/admin/reports", verifyToken, adminReportList);

// -- Approve Report --
router.put("/admin/reports/:id", verifyToken, approveReport);
export default router;
