import { Request, Response, NextFunction } from "express";
import { AnunciosService } from "../services/Anuncios.service";

class AnunciosController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const anuncio = new AnunciosService().get(req.params.id);

            if(anuncio)
                res.json(anuncio);


        } catch (error) {
            return next(error)
        }
    }

    async store(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            return next(error)
        }
    }


}

export default new AnunciosController();