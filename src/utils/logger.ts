import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

// Custom log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `🕒 [${timestamp}] | ${level.toUpperCase()} | ${message}`;
});

// Base logger configuration
const createLogger = (filename: string, level: string) =>
  winston.createLogger({
    level,
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      logFormat
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename, level }),
    ],
  });

// ✅ Server Logger (Handles server-related logs)
export const serverLogger = createLogger("logs/server.log", "info");

// ✅ API Logger (Handles API request/response logs)
export const apiLogger = createLogger("logs/api.log", "info");

// ✅ Error Logger (Handles errors separately)
export const errorLogger = createLogger("logs/error.log", "error");

// ✅ Stream for external logging (e.g., Morgan middleware)
export const stream = {
  write: (message: string) => {
    apiLogger.info(message.trim());
  },
};
