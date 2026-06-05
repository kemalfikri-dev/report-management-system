import { Request, Response } from "express";
import { Session } from "express-session";
import { prisma } from '../lib/db';
import bcrypt from 'bcrypt';


// -- Register -- 
export const register = async (req: Request, res:Response) => {
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

// -- Login --
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;


    const user = await prisma.users.findUnique({
      where: {email},
    });

    if(!user){
      return res.status(404).json({error: 'Email tidak ditemukan'})
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({error: 'Password Salah'})
    }

    return res.status(200).json({
      message: "Login sukses",
      user: {
        id: user.id,
        name: user.name,
      },
    });
    

  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: 'Terjadi kesalahan, coba lagi'})
  }
}