import express from 'express';
import { createReport, reportById, showReport } from '../controllers/reportController';
import { verifyToken } from "../../Auth/middlewares/verifyToken";

const router = express.Router();

//-- Create Report --
router.post('/reports', verifyToken, createReport);

//-- Show Report --
router.get('/reports/my', verifyToken, showReport);
router.get('/reports/my/:id', verifyToken, reportById)


export default router;