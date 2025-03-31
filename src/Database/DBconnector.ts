import path from "path";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database:
    process.env.DATABASE_PATH || path.join(__dirname, "../../airports.db"),
  entities: [path.join(__dirname, "../entities/*.{js,ts}")],
  synchronize: false,
  logging: false,
});
