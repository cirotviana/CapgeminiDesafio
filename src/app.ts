import express from "express";
import helmet from "helmet";
import cors from "cors";
import { Connection, createConnection } from "typeorm";

import { dbConfig } from "./database/db";
import allRoutes from "./routes";

import * as core from 'express-serve-static-core';
//require('./routes')

//const helmet = require('helmet')
//const cors = require('cors')

export class App {
    express: core.Express;

    constructor() {
        this.express = express();

        this.database()
        this.middlewares()
        this.routes()
        //this.errorManagement()
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
        this.express.use(express.json())
    }

    routes() {
        this.express.use('/api', allRoutes)
    }

    /*     errorManagement() {
            this.express.use(core.notFoundHandler)
            this.express.use(core.errorMiddleware)
    
            process.on('unhandledRejection', reason => {
                core.logger.info('Unhandled rejection, throwing')
                throw reason
            })
    
            process.on('uncaughtException', error => {
                core.logger.info('Unhandled exception, handling')
    
                core.errorHandler.handleError(error)
                if (!core.errorHandler.isTrustedError(error)) {
                    process.exit(1)
                }
            })
        } */
}
