import { Request, Response, NextFunction } from "express";
import { errorLogger } from "../utils/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorLogger.error(`${req.method} ${req.url} - Error: ${err.message}`);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
};
