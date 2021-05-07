export const visualizacoesPorReal = 30;
export const compartilhamentoPorClique = 3 / 20;
export const clicksPorVisualizacao = 12 / 100;
export const visualizacoesPorCompartilhamento = 40;
export const numMaxCompartilhamentos = 4;

export class CalculadoraDeAlcanceDeAnuncios {

    static getVisualizacoesPorInvestimento(valor) {
        return Math.floor(visualizacoesPorReal * valor);
    }

    static getNumVisualizacoes(compartilhamentos) {
        return Math.floor(visualizacoesPorCompartilhamento * compartilhamentos);
    }

    static getNumCliques(visualizacoes) {
        return Math.floor(clicksPorVisualizacao * visualizacoes);
    }

    static getNumCompatilhamentos(cliques) {
        return Math.floor(compartilhamentoPorClique * cliques);
    }

    static geraCompartilhamento(cliques) {
        return cliques > (1 / compartilhamentoPorClique) ? true : false;
    }

    static getVisualizacaoPorCompartilhamento(cliquesEmVisualizacoes) {
        var numCliques = cliquesEmVisualizacoes;
        var numTotalVisualizacoesPorCompartilhamento = 0;
        var numCompartilhamentosRealizados = 0;
        while ((numCompartilhamentosRealizados < numMaxCompartilhamentos) && this.geraCompartilhamento(numCliques)) {
            const numCompartilhamentos = this.getNumCompatilhamentos(numCliques);
            //Visualizações por compartilhamento
            const numVisualizacoesPorCompartilhamento = this.getNumVisualizacoes(numCompartilhamentos);
            //Clicks Gerados por essas visualizações
            numCliques = this.getNumCliques(numVisualizacoesPorCompartilhamento);
            numTotalVisualizacoesPorCompartilhamento += numVisualizacoesPorCompartilhamento;
            numCompartilhamentosRealizados++;
/*             console.log('\nCompartilhamento n' + numCompartilhamentosRealizados);
            console.log('Num Compartilhamentos: ' + numCompartilhamentos);
            console.log('Num Visualizacoes deste compartilhamento: ' + numVisualizacoesPorCompartilhamento);
            console.log('Num Clicks nesses compartilhamentos: ' + numCliques); */
        }
        return numTotalVisualizacoesPorCompartilhamento;
    }

    static calcular(investimentoInicial) {
        //Investimento Inicial gera visualizações
        const numVisualizacoesInvestimentoInicial = this.getVisualizacoesPorInvestimento(investimentoInicial);
        //Essas visualizações geram clicks 
        const numClicksInvestimentoInicial = this.getNumCliques(numVisualizacoesInvestimentoInicial);
        //Esses cliques geram compatilhamentos
        const numVisualizacoesPorCompartilhamento = this.getVisualizacaoPorCompartilhamento(numClicksInvestimentoInicial);
        return Math.floor(numVisualizacoesInvestimentoInicial + numVisualizacoesPorCompartilhamento)
    }

}



//console.log('\n Total Visualizações:' + new CalculadoraDeAlcanceDeAnuncios().calcular(0.11));

