import { Request, Response } from "express";

export const dashboard = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Dashboard!",
    userData: req.user
  });
} 