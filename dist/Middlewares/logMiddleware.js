"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMiddleware = void 0;
const logger_1 = require("../utils/logger");
const logMiddleware = (req, res, next) => {
    const start = Date.now();
    const { method, url } = req;
    logger_1.apiLogger.info(`📥 [API REQUEST] ${method} ${url}.`);
    res.on("finish", () => {
        const duration = Date.now() - start; // Calculate response time
        logger_1.apiLogger.info(`📤 [API RESPONSE] ${method} ${url} | Status: ${res.statusCode} | Duration: ${duration}ms`);
    });
    next();
};
exports.logMiddleware = logMiddleware;
