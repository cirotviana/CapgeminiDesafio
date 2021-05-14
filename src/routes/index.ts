import { Router } from "express";

const routes = Router();



import AnunciosController from "../app/controllers/Anuncios.controller";
import ClienteController from "../app/controllers/Cliente.controller";


// Anuncios routes
routes.post('/anuncios/', AnunciosController.store)
routes.get('/anuncios/:id', AnunciosController.get)

//Clientes routes
routes.post('/clientes/', ClienteController.store)
routes.get('/clientes/:id', ClienteController.get)




export default routes
