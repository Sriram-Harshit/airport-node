"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const DBconnector_1 = require("./Database/DBconnector");
const errorHandler_1 = require("./Middlewares/errorHandler");
const logger_1 = require("./utils/logger");
const logMiddleware_1 = require("./Middlewares/logMiddleware");
const airport_1 = __importDefault(require("./Routes/airport"));
const logs_1 = __importDefault(require("./Routes/logs"));
// Load environment variables
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
// Express App
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(logMiddleware_1.logMiddleware);
// Routes
app.use("/airport", airport_1.default);
app.use("/logs", logs_1.default);
app.use(errorHandler_1.errorHandler);
app.get("/", (req, res) => {
    res.send("Airport Information API Development");
});
// Graceful Shutdown Handler
const shutdown = async () => {
    logger_1.serverLogger.info("Shutting down server...");
    process.exit(0); // Exit process
};
// Initialize Database and Start Server
DBconnector_1.AppDataSource.initialize()
    .then(() => {
    logger_1.serverLogger.info(`✅ Database connected successfully`);
    app.listen(PORT, () => {
        logger_1.serverLogger.info(`🚀 Server running at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    logger_1.errorLogger.error(`❌ Database connection error at ${new Date().toISOString()}: ${error.message}`);
    process.exit(1);
});
// Handling process termination signals
process.on("SIGINT", shutdown); // Ctrl + C
process.on("SIGTERM", shutdown); // Termination Signal
