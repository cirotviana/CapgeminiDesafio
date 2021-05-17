import { NextFunction, Request, Response } from "express";
import RelatorioAnuncioService from "../../services/anuncios/RelatorioAnuncio.service";

class RelatorioAnuncioController{

    async getRelatorios(req: Request, res: Response, next: NextFunction){
        try {
            const {dataInicio, dataTermino, cliente} = req.query 
            const response = await RelatorioAnuncioService.getRelatoriosByClienteAndInterval(dataInicio, dataTermino, cliente)
            res.status(response.status).json(response.data)
        } catch (error) {
            next(error)
        }
    }
    
    async getRelatorioByAnuncioId(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params
            const response = await RelatorioAnuncioService.getRelatorioByAnuncioId(parseInt(id))
            res.status(response.status).json(response.data);            
        } catch (error) {
            next(error)
        }
    }
}

export default new RelatorioAnuncioController()