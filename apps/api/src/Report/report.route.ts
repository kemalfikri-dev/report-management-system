import express from "express";
import {
  createReport,
  deleteReport,
  reportById,
  showReport,
  updateReport,
} from "./report.controller";
import { verifyToken } from "../auth/auth.middleware";

const router = express.Router();

//-- Create Report --
router.post("/reports", verifyToken, createReport);

//-- Show Report --
router.get("/reports", verifyToken, showReport);
router.get("/reports/:id", verifyToken, reportById);

//-- Update Report --
router.put("/reports/:id", verifyToken, updateReport);

//-- Delete Report --
router.delete("/reports/:id", verifyToken, deleteReport);

export default router;
