"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "src/Database/airports.db",
    entities: ["src/entities/*.ts"],
    synchronize: true,
    logging: false,
});
exports.AppDataSource.initialize()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error:", err));
