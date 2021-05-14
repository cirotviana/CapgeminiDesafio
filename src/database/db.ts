import { ConnectionOptions, createConnection } from "typeorm";

import { AnunciosModel } from "../app/models/Anuncios.model";
import { ClienteModel } from "../app/models/Cliente.model";

const models = [AnunciosModel, ClienteModel]

export const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "1234",
  database: process.env.POSTGRES_DB || "capgemini-desafio",
  entities: models,
  synchronize: true,
};

