export const VISUALIZACOES_POR_REAL = 30;
export const COMPARTILHAMENTO_POR_CLIQUE = 3 / 20;
export const CLIQUES_POR_VISUALIZACAO = 12 / 100;
export const VISUALIZACOES_POR_COMPARTILHAMENTO = 40;
export const MAX_COMPARTILHAMENTOS = 4;

export class CalculadoraDeAlcanceDeAnuncios {

    static getVisualizacoesPorInvestimento(valor: number) {
        return Math.floor(VISUALIZACOES_POR_REAL * valor);
    }

    static getVisualizacoes(compartilhamentos: number) {
        return Math.floor(VISUALIZACOES_POR_COMPARTILHAMENTO * compartilhamentos);
    }

    static getCliques(visualizacoes: number) {
        return Math.floor(CLIQUES_POR_VISUALIZACAO * visualizacoes);
    }

    static getCompatilhamentos(cliques: number) {
        return Math.floor(COMPARTILHAMENTO_POR_CLIQUE * cliques);
    }
    
    static geraCompartilhamento(cliques: number) {
        return cliques > (1 / COMPARTILHAMENTO_POR_CLIQUE) ? true : false;
    }

    static getRelatorioCompartilhamento(cliques: number) {
        let numCliques = cliques;
        let numCompartilhamentosRealizados = 0;
        let numTotalCliques, numTotalCompartilhamentos, numTotalVisualizacoes;
        numTotalCliques = numTotalCompartilhamentos = numTotalVisualizacoes = 0
        while ((numCompartilhamentosRealizados < MAX_COMPARTILHAMENTOS) && this.geraCompartilhamento(numCliques)) {
            const numCompartilhamentos = this.getCompatilhamentos(numCliques);
            const numVisualizacoesPorCompartilhamento = this.getVisualizacoes(numCompartilhamentos);
            numCliques = this.getCliques(numVisualizacoesPorCompartilhamento);
            numTotalCompartilhamentos += numCompartilhamentos;
            numTotalCliques += numCliques;
            numTotalVisualizacoes += numVisualizacoesPorCompartilhamento;
            numCompartilhamentosRealizados++;
        }
        return { numTotalCliques, numTotalCompartilhamentos, numTotalVisualizacoes };
    }

    static calcular(investimentoInicial: number) {
        let relatorio = {
            investimento: investimentoInicial,
            visualizacoes: 0,
            cliques: 0,
            compartilhamentos: 0
        }
        relatorio.visualizacoes += this.getVisualizacoesPorInvestimento(investimentoInicial);
        relatorio.cliques += this.getCliques(relatorio.visualizacoes);
        const { numTotalCliques, numTotalCompartilhamentos, numTotalVisualizacoes } = this.getRelatorioCompartilhamento(relatorio.cliques);
        relatorio.cliques += numTotalCliques;
        relatorio.visualizacoes += numTotalVisualizacoes;
        relatorio.compartilhamentos += numTotalCompartilhamentos;
        return relatorio;
    }

}

console.log(CalculadoraDeAlcanceDeAnuncios.calcular(100));

