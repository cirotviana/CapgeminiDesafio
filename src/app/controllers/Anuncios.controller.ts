import { Request, Response, NextFunction } from "express";
import { AnunciosService } from "../services/Anuncios.service";
import { ErrorService } from "../services/Error.service";
import * as HTTP from "../../constants/httpStatus";




class AnunciosController {

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            
            const response = await new AnunciosService().get(id);          

            return res.status(response.status).json(response);

        } catch (error) {
            return next(error)
        }
    }

    async store(req: Request, res: Response, next: NextFunction) {
        try {
            
            const response = await new AnunciosService().store(req.body)

            console.log("response");
            console.log(response);
            

            if (response?.status !== HTTP.OK) {
                const error = new ErrorService(response);
                return next(error)
            }

            res.json(response)

        } catch (error) {
            return next(error)
        }
    }


}

export default new AnunciosController();