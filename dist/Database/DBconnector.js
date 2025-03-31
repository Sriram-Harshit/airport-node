"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: process.env.DATABASE_PATH || path_1.default.join(__dirname, "../../airports.db"),
    entities: [path_1.default.join(__dirname, "../entities/*.{js,ts}")],
    synchronize: false,
    logging: false,
});
