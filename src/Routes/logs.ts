import express from "express";
import fs from "fs";
import path from "path";

import { errorLogger } from "../utils/logger";

const router = express.Router();

// Function to read logs
const readLogFile = (filePath: string): string => {
  try {
    if (!fs.existsSync(filePath)) {
      errorLogger.error(`🚨 Log file not found `);
      return "Log file not found.";
    }

    return fs.readFileSync(filePath, "utf8");
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorLogger.error(`❌ Error reading log file: `, err.message);
      return `Error reading log file: ${err.message}`;
    } else {
      errorLogger.error(`❌ Unknown error reading log file`, err);
      return "Unknown error reading log file.";
    }
  }
};

// Correct log file paths using `path.resolve`
const apiLogPath = path.resolve(__dirname, "../../logs/api.log");
const serverLogPath = path.resolve(__dirname, "../../logs/server.log");
const errorLogPath = path.resolve(__dirname, "../../logs/error.log");

// Endpoint to fetch API logs
router.get("/api", (req, res) => {
  const logs = readLogFile(apiLogPath);
  res.type("text/plain").send(logs);
});

// Endpoint to fetch Server logs
router.get("/server", (req, res) => {
  const logs = readLogFile(serverLogPath);
  res.type("text/plain").send(logs);
});

// Endpoint to fetch error logs
router.get("/error", (req, res) => {
  const logs = readLogFile(errorLogPath);
  res.type("text/plain").send(logs);
});

export default router;
