import express from "express";
import helmet from "helmet";
import cors from "cors";
import { Connection, createConnection } from "typeorm";

import { dbConfig } from "./database/db";
import allRoutes from "./routes";

import * as core from 'express-serve-static-core';

export class App {
    express: core.Express;

    constructor() {
        this.express = express();

        this.database()
        this.middlewares()
        this.routes()
        this.errorManagement()
    }

    database() {
        createConnection(dbConfig)
            .then((_connection: Connection) => {

            }).catch((err: any) => { console.log('Erro na conexão com o BD.\n' + err) })
    }

    middlewares() {
        this.express.use(cors())
        //   this.express.use(morgan('combined', { stream: core.stream }))
        this.express.use(helmet())
        this.express.use(express.urlencoded({ extended: true}))
        this.express.use(express.json())
    }

    routes() {
        this.express.use('/api', allRoutes)
    }

    errorManagement() {
        /*         this.express.use(function inputErrorHandler(err, req, res, next) {
                    if (req.xhr) {
                        res.status(500).send({ error: 'Something failed!' });
                    } else {
                        next(err);
                    }
                })*/

        this.express.use(function errorHandler(err: any, req: core.Request, res: core.Response, next: core.NextFunction) {
            console.log(err);
            
            const status  = !err.status ? 500 : err.status;
            res.status(status);
            res.json(err?.message)
        })



    }
}
