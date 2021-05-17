import { Router } from "express";
const routes = Router();

import AnunciosController from "../controllers/anuncios/Anuncios.controller";
import ClienteController from "../controllers/clientes/Cliente.controller";
import RelatorioAnuncioController from "../controllers/anuncios/RelatorioAnuncio.controler"


// Relatorios
routes.get('/anuncios/relatorio', RelatorioAnuncioController.getRelatorios) //
routes.get('/anuncios/:id/relatorio', RelatorioAnuncioController.getRelatorioByAnuncioId) //Relatorio de todos os anuncios

// Anuncios routes
routes.get('/anuncios/:id', AnunciosController.getAnunciosById)
routes
    .get('/anuncios/', AnunciosController.getAnuncios)
    .post('/anuncios/', AnunciosController.createAnuncio)
    
//Clientes routes
routes.post('/clientes/', ClienteController.createCliente)
routes.get('/clientes/:id', ClienteController.getClienteById)




export default routes
