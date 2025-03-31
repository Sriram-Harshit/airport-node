"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../utils/logger");
const router = express_1.default.Router();
// Function to read logs
const readLogFile = (filePath) => {
    try {
        if (!fs_1.default.existsSync(filePath)) {
            logger_1.errorLogger.error(`🚨 Log file not found `);
            return "Log file not found.";
        }
        return fs_1.default.readFileSync(filePath, "utf8");
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.errorLogger.error(`❌ Error reading log file: `, err.message);
            return `Error reading log file: ${err.message}`;
        }
        else {
            logger_1.errorLogger.error(`❌ Unknown error reading log file`, err);
            return "Unknown error reading log file.";
        }
    }
};
// Correct log file paths using `path.resolve`
const apiLogPath = path_1.default.resolve(__dirname, "../../logs/api.log");
const serverLogPath = path_1.default.resolve(__dirname, "../../logs/server.log");
const errorLogPath = path_1.default.resolve(__dirname, "../../logs/error.log");
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
exports.default = router;
