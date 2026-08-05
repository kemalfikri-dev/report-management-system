import { JwtPayload } from "jsonwebtoken";
import { Report } from "@prisma/client";

export interface UserPayload extends JwtPayload{
  id: string;
  name: string;
  role: "USER" | "ADMIN";
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
      report?: Report;
    }
  }
}