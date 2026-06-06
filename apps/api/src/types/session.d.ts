import { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload{
  id: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}