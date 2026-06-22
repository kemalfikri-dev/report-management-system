import express from "express";
import { login, logout, register, getMe } from "./auth.controller";
import { verifyToken } from "./auth.middleware";

const router = express.Router();

// -- Register --

router.post("/register", register);

// -- Login --
router.post("/login", login);

//-- LogOut --
router.post("/logout", logout);

// -- Get Me --
router.get("/me", verifyToken, getMe);

export default router;
