import { Request, Response, NextFunction } from "express";

import ClienteService from "../../services/clientes/Clientes.service";

class ClienteController {

    async getClienteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const response = await ClienteService.getClienteById(id);
            res.status(response.status).json(response);
        } catch (error) {
            return next(error)
        }
    }

    async createCliente(req: Request, res: Response, next: NextFunction) {
        try {
            const { nome } = req.body
            const response = await ClienteService.createCliente(nome)
            res.status(response.status).json(response);
        } catch (error) {
            return next(error)
        }
    }
}

export default new ClienteController();