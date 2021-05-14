import { AnunciosModel } from "../models/Anuncios.model";
import { ClienteModel } from "../models/Cliente.model";
import { AnunciosDAO } from "../models/DAO/AnunciosDAO";
import { ClienteDAO } from "../models/DAO/ClienteDAO";

export class ClienteService {



    async store() {
        const newCliente = new ClienteModel();
        const cliente = await new ClienteDAO().create(newCliente)
        if(cliente)
            return {status: 200, cliente}
    }


    async get(id: any) {

        if (isNaN(parseInt(id)))
            return ({ status: 400, message: "Identificador Inválido. Forneça um identificador válido." })

        const anuncio = await new AnunciosDAO().getById(id);
        if (anuncio)
            return { status: 200, anuncio };

    }

}