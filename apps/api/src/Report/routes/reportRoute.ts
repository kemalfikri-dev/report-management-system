import express from "express";
import {
  createReport,
  deleteReport,
  reportById,
  showReport,
  updateReport,
} from "../controllers/reportController";
import { verifyToken } from "../../Auth/middlewares/verifyToken";

const router = express.Router();

//-- Create Report --
router.post("/reports/create", verifyToken, createReport);

//-- Show Report --
router.get("/reports", verifyToken, showReport);
router.get("/reports/my/:id", verifyToken, reportById);

//-- Update Report --
router.post("/reports/update", verifyToken, updateReport);

//-- Delete Report --
router.post("/reports/delete", verifyToken, deleteReport);

export default router;
