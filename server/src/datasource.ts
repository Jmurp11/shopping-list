import { DataSource, DataSourceOptions } from "typeorm";

const sqlConnectionInfo: DataSourceOptions = {
  type: "postgres",
  host: process.env.HOST,
  port: parseInt(process.env.DBPORT, 10),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
  entities: ["src/entity/*.entity.{js,ts}"],
  synchronize: true
};

export const AppDataSource = new DataSource({ ...sqlConnectionInfo });
