import { ConnectionOptions, createConnection } from "typeorm";

import { AnunciosModel } from "../app/DAO/models/Anuncios.model";
import { ClientesModel } from "../app/DAO/models/Clientes.model";

const models = [AnunciosModel, ClientesModel]

export const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "capgemini-desafio",
  entities: models,
  synchronize: true,
};

