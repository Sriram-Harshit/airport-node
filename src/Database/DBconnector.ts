import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "src/Database/airports.db",
  entities: ["src/entities/*.ts"],
  synchronize: false,
  logging: false,
});
