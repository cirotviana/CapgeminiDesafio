import { convertDateString } from "../../utils/string";
import { AnunciosModel } from "../models/Anuncios.model";
import { ClienteModel } from "../models/Cliente.model";
import { AnunciosDAO } from "../models/DAO/AnunciosDAO";
import { ClienteDAO } from "../models/DAO/ClienteDAO";

export class AnunciosService {



    async store(body: any) {
        const { nome, dataInicio, dataTermino, investimentoPorDia, idCliente } = body;

        const cliente = await new ClienteDAO().getById(idCliente);
        if (!cliente) return { status: 400, message: "Cliente Invalido!" }
        console.log();


        const anuncioEntity = new AnunciosModel(nome, new Date(convertDateString(dataInicio)), new Date(convertDateString(dataTermino)), investimentoPorDia, cliente);

        const anuncioCriado = await new AnunciosDAO().create(anuncioEntity);

        if (!anuncioCriado) return { status: 500, message: "Não foi possível salvar o anúncio." }

        return { status: 200, anuncioCriado }
    }


    async get(id: any) {
        const idInt = parseInt(id);
        if (isNaN(idInt))
            return ({ status: 400, message: "Identificador Inválido. Forneça um identificador válido." })

        const anuncio = await new AnunciosDAO().getById(idInt);
        if (!anuncio) return { status: 404, message: "Anuncio não encontrado.", anuncio: {} }
        return { status: 200, message: "Anuncio encontrado com sucesso.", anuncio };
    }

    async getAll() {
        const anuncios = await new AnunciosDAO().getAll();
        if (!anuncios) return { status: 500, message: "Não foi possível salvar o anúncio." }

        return { status: 200, anuncios: anuncios };
    }

}