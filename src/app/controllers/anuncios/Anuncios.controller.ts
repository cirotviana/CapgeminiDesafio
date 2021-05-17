import { Request, Response, NextFunction } from "express";
import AnunciosService from "../../services/anuncios/Anuncios.service";

class AnunciosController {

    async getAnunciosById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const response = await AnunciosService.getAnuncioById(id);
            return res.status(response.status).json(response);
        } catch (error) {
            return next(error)
        }
    }

    async getAnuncios(req: Request, res: Response, next: NextFunction) {
        try {
            const respose = await AnunciosService.getAnuncios()
            return res.status(respose.status).json(respose)
        } catch (error) {
            return next(error)
        }

    }

    async createAnuncio(req: Request, res: Response, next: NextFunction) {
        try {
            const {nome, investimentoPorDia, cliente, dataInicio, dataTermino} = req.body
            const response = await AnunciosService.createAnuncio(nome, investimentoPorDia, dataInicio, dataTermino, cliente)
            res.status(response.status).json(response)
        } catch (error) {
            return next(error)
        }
    }
}

export default new AnunciosController();