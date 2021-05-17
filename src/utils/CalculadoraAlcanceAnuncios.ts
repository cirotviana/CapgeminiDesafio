export const VISUALIZACOES_POR_REAL = 30;
export const COMPARTILHAMENTO_POR_CLIQUE = 3 / 20;
export const CLIQUES_POR_VISUALIZACAO = 12 / 100;
export const VISUALIZACOES_POR_COMPARTILHAMENTO = 40;
export const MAX_COMPARTILHAMENTOS = 4;

export class CalculadoraAlcanceAnuncios {

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
        let totalCliques, totalCompartilhamentos, totalVisualizacoes;
        totalCliques = totalCompartilhamentos = totalVisualizacoes = 0
        let nCompartilhamentos = 0;
        while ((nCompartilhamentos < MAX_COMPARTILHAMENTOS) && this.geraCompartilhamento(numCliques)) {
            const {cliques, compartilhamentos, visualizacoes} = this.simulaCompartilhamento(numCliques);

            totalCompartilhamentos += compartilhamentos;
            numCliques = cliques;
            totalCliques += numCliques;
            totalVisualizacoes += visualizacoes;
            
            nCompartilhamentos++;
        }
        return { numTotalCliques: totalCliques, numTotalCompartilhamentos: totalCompartilhamentos, numTotalVisualizacoes: totalVisualizacoes };
    }

    static simulaCompartilhamento(cliques: number){
        const compartilhamentos = this.getCompatilhamentos(cliques);
        const visualizacoes = this.getVisualizacoes(compartilhamentos);
        cliques = this.getCliques(visualizacoes);
        return {compartilhamentos, visualizacoes, cliques}        
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
