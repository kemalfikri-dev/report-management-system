import { Request, Response } from "express";
import { prisma } from '../lib/db';
import bcrypt from 'bcrypt';



exports.register = async (req: Request, res:Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await prisma.users.findUnique({
        where: { email },
      });

    if (existing) {
      return res.status(400).json({ error: 'Email sudah terdaftar!' });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    await prisma.users.create({
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
    console.log(err);
    res.status(500).json({ error: 'Terjadi kesalahan, coba lagi!' });
  }
}
