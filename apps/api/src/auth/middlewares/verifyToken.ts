import { Request, Response, NextFunction, response } from "express";
import * as jwt from "jsonwebtoken"
import { UserPayload } from "@/types/session";



export const verifyToken = ( 
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET
    
  if (!secret) {
    return res.status(500).json({ message: "Server configuration error" });
  }

  if(!token){
    return res.status(401).json({message: 'Access Denied: Token tidak valid'})
  }
  try {
    const verifyPayload = jwt.verify(token, secret) as UserPayload ;

    req.user =verifyPayload;

    next();
  }
  catch (err) {
    return res.status(403).json({message: 'Invalid or Expired Token'})
  }
}