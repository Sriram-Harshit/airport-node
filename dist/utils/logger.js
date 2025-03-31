"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.errorLogger = exports.apiLogger = exports.serverLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Custom log format
const logFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
    return `🕒 [${timestamp}] | ${level.toUpperCase()} | ${message}`;
});
// Base logger configuration
const createLogger = (filename, level) => winston_1.default.createLogger({
    level,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename, level }),
    ],
});
// ✅ Server Logger (Handles server-related logs)
exports.serverLogger = createLogger("logs/server.log", "info");
// ✅ API Logger (Handles API request/response logs)
exports.apiLogger = createLogger("logs/api.log", "info");
// ✅ Error Logger (Handles errors separately)
exports.errorLogger = createLogger("logs/error.log", "error");
// ✅ Stream for external logging (e.g., Morgan middleware)
exports.stream = {
    write: (message) => {
        exports.apiLogger.info(message.trim());
    },
};
