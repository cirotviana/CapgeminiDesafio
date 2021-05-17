
import { AnunciosDAO } from "../../DAO/AnunciosDAO";
import { AnunciosModel } from "../../DAO/models/Anuncios.model";
import { convertDateString } from "../../../utils/string";
import HTTP from "http-status"
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { CalculadoraAlcanceAnuncios } from "../../../utils/CalculadoraAlcanceAnuncios";


class RelatorioAnuncioService {

    async getRelatoriosByClienteAndInterval(dataInicio: any, dataTermino: any, cliente: any) {
        let query: any = {};
        if (dataInicio && dataTermino) {
            query.dataInicio = MoreThanOrEqual(convertDateString(dataInicio))
            query.dataTermino = LessThanOrEqual(convertDateString(dataTermino))
        }
        if(cliente)
            query.cliente = cliente;
        const anuncios = await new AnunciosDAO().findByClienteAndInterval(query)
        if (!anuncios) {
            return { status: HTTP.NOT_FOUND, anuncios: {} }
        }
        anuncios.forEach((anuncio: AnunciosModel) => this.gerarRelatorio(anuncio))
        return { status: HTTP.OK, data: anuncios }
    }

    async getRelatorioByAnuncioId(id: number) {
        const anuncio = await new AnunciosDAO().findById(id)
        if (!anuncio) {
            return { status: HTTP.NOT_FOUND, data: {} }
        }
        this.gerarRelatorio(anuncio);
        return { status: HTTP.OK, data: anuncio }
    }

    gerarRelatorio(anuncio: AnunciosModel) {
        const diasInvestimento: number = Math.abs(anuncio.dataInicio.getTime() - anuncio.dataTermino.getTime()) / 86400000
        const { cliques, 
                compartilhamentos,
                investimento, 
                visualizacoes 
                } = CalculadoraAlcanceAnuncios.calcular(anuncio.investimentoPorDia)

                
        const totalCliques = cliques * diasInvestimento
        const totalCompartilhamentos = compartilhamentos * diasInvestimento
        const totalInvestimento = investimento * diasInvestimento
        const totalVisualizacoes = visualizacoes * diasInvestimento
        anuncio.relatorio = { totalCliques, totalCompartilhamentos, totalInvestimento, totalVisualizacoes }
    }

}

export default new RelatorioAnuncioService();