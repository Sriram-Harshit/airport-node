import path from "path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "../../airports.db"),
  entities: [path.join(__dirname, "../entities/*.ts")],
  synchronize: false,
  logging: false,
});
