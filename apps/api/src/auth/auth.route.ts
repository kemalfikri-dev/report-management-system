import express from "express";
import { login, logout, register } from "./auth.controller";

const router = express.Router();

// -- Register --

router.post("/register", register);

// -- Login --
router.post("/login", login);

//-- LogOut --
router.post("/logout", logout);
export default router;
