import express from 'express';
import { dashboard } from './dashboard.controller';
import { verifyToken } from "../auth/auth.middleware";

const router = express.Router();

//-- Dashboard --
router.get('/dashboard', verifyToken, dashboard);

export default router;