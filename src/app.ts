import express from "express";
import helmet from "helmet";
import cors from "cors";
import { createConnection } from "typeorm";

import { dbConfig } from "./database/db";
import allRoutes from "./app/routes";

import * as core from 'express-serve-static-core';

//const express: any = ;
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

createConnection(dbConfig)
    .catch((err: any) => { console.log('Não foi possível conectar com o BD.\n' + err) })

app.use('/v1', allRoutes)

app.use(function errorHandler(err: any, req: core.Request, res: core.Response, next: core.NextFunction) {
    const status = !err.status ? 500 : err.status;
    res.status(status);
    res.json(err?.message)
})


export default app;