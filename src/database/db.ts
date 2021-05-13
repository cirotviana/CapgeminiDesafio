import { ConnectionOptions, createConnection } from "typeorm";

export const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "1234",
  database: process.env.POSTGRES_DB || "capgemini-desafio",
  entities: ["../app/models/*.ts"],
  synchronize: true,
};

