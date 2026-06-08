import express from 'express';
import { dashboard } from "../controllers/dashboardController";
import { verifyToken } from "../../auth/middlewares/verifyToken";

const router = express.Router();

//-- Dashboard --
router.get('/dashboard', verifyToken, dashboard);

export default router;