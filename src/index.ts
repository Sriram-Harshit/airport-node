import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import { AppDataSource } from "./Database/DBconnector";
import { errorHandler } from "./Middlewares/errorHandler";
import { serverLogger, errorLogger } from "./utils/logger";
import { logMiddleware } from "./Middlewares/logMiddleware";
import airportRoutes from "./Routes/airport";
import logRoutes from "./Routes/logs";

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(logMiddleware);

// Routes
app.use("/airport", airportRoutes);
app.use("/logs", logRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Airport Information API Development");
});

// Graceful Shutdown Handler
const shutdown = async () => {
  serverLogger.info("Shutting down server...");
  process.exit(0); // Exit process
};

// Initialize Database and Start Server
AppDataSource.initialize()
  .then(() => {
    serverLogger.info(`✅ Database connected successfully`);
    app.listen(PORT, () => {
      serverLogger.info(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    errorLogger.error(
      `❌ Database connection error at ${new Date().toISOString()}: ${
        error.message
      }`
    );
    process.exit(1);
  });

// Handling process termination signals
process.on("SIGINT", shutdown); // Ctrl + C
process.on("SIGTERM", shutdown); // Termination Signal
