import { AnunciosModel } from "../../DAO/models/Anuncios.model";
import { AnunciosDAO } from "../../DAO/AnunciosDAO";
import { ClienteDAO } from "../../DAO/ClienteDAO";
import { convertDateString } from "../../../utils/string";

class AnunciosService {

    async createAnuncio(nome: string, investimentoPorDia: string, dataInicio: any, dataTermino: any, cliente: any) {
        dataInicio = new Date(convertDateString(dataInicio))
        dataTermino = new Date(convertDateString(dataTermino))
        
        cliente = cliente ? await new ClienteDAO().getById(cliente): undefined;
        if (!cliente) {
            return { status: 400, data: {} }
        }

        const anuncioEntity = new AnunciosModel(nome, dataInicio, dataTermino, parseFloat(investimentoPorDia), cliente);
        const anuncioCriado = await new AnunciosDAO().create(anuncioEntity);
        if (!anuncioCriado) {
            return { status: 500, data: {} }
        }
        return { status: 201, data: anuncioCriado }
    }

    async getAnuncioById(id: any) {
        const idInt = parseInt(id);
        if (isNaN(idInt))
            return ({ status: 400, anuncio: {} })

        const anuncio = await new AnunciosDAO().findById(idInt);
        if (!anuncio) {
            return { status: 404, data: {} }
        }
        return { status: 200, data: anuncio };
    }

    async getAnuncios() {
        const anuncios = await new AnunciosDAO().getAll();
        if (!anuncios) {
            return { status: 500, anuncios: {} }
        }
        return { status: 200, data: anuncios };
    }

}

export default new AnunciosService();