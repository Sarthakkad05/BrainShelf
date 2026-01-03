import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET; 

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

interface RequestWithUserId extends Request {
  userId?: string;
}


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;


  if (!authHeader) {
    res.status(403).json({ msg: "No authorization header" });
    return;
  }

  const token = authHeader.split(" ")[1]; 
  if (!token) {
    res.status(403).json({ msg: "Invalid token format" });
    return;
  }

  try {
  const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
(req as RequestWithUserId).userId = decoded.id;
    next(); 
  } catch (err) {
    res.status(403).json({ msg: "Invalid token" });
  }
};
