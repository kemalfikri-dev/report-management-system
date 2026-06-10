import { Request, Response } from "express";
import { UserPayload } from "@/types/express";
export const dashboard = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Dashboard!",
    userData: req.user
  });
} 