import { Request, Response, NextFunction } from "express";
import { apiLogger } from "../utils/logger";

export const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  const { method, url } = req;

  apiLogger.info(`📥 [API REQUEST] ${method} ${url}.`);

  res.on("finish", () => {
    const duration = Date.now() - start; // Calculate response time

    apiLogger.info(
      `📤 [API RESPONSE] ${method} ${url} | Status: ${res.statusCode} | Duration: ${duration}ms`
    );
  });

  next();
};
