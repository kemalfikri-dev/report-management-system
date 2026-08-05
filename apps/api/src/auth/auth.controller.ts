import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { prisma } from "../lib/db";
import bcrypt from "bcrypt";
import { z } from "zod";
import { loginSchema, registerSchema } from "../validators/auth.validator";

// -- USER AUTH --//

// -- Register --
export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { name, email, password } = validatedData;

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({ error: "Email sudah terdaftar!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Register sukses",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.issues[0].message });
    }
    console.log(err);
    res.status(500).json({ error: "Terjadi kesalahan, coba lagi!" });
  }
};

// -- Login --
export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Email atau Password Salah" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Email atau Password Salah" });
    }

    const payload = {
      name: user.name,
      id: user.id,
      role: (user as any).role,
    };
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login success", user: payload });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Terjadi kesalahan, coba lagi" });
  }
};

// -- Logout --
export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token");
    return res.status(201).json({ message: "Logout Berhasil" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Terjadi kesalahan, coba lagi" });
  }
};

// -- Get Me --
export const getMe = (req: Request, res: Response) => {
  try {
    const userData = req.user;

    res.status(200).json({ message: "Login success", userData });
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ error: "data User tidak ditemukan, silahkan login kembali" });
  }
};
