const routes = require('express').Router()

import AnunciosController from "../app/controllers/Anuncios.controller";


// Anuncios routes
//routes.post('/', AnunciosController.store)
routes.get('/:id', AnunciosController.get)


export default routes
