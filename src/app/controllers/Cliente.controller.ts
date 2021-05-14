import { Request, Response, NextFunction } from "express";
import { ClienteService } from "../services/Cliente.service";
import { ErrorService } from "../services/Error.service";
import * as HTTP from "../../constants/httpStatus";




class ClienteController {

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const response = await new ClienteService().get(id);

            console.log(response);
            

            if (response?.status !== HTTP.OK) {
                const error = new ErrorService(response);
                return next(error)
            }
            return res.json(response);

        } catch (error) {
            return next(error)
        }
    }

    async store(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await new ClienteService().store()

            if (response?.status !== HTTP.OK) {
                const error = new ErrorService(response);
                return next(error)
            }
            res.json(response.cliente);
        } catch (error) {
            return next(error)
        }
    }


}

export default new ClienteController();