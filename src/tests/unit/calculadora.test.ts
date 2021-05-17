import {
    CalculadoraAlcanceAnuncios,
    CLIQUES_POR_VISUALIZACAO,
    COMPARTILHAMENTO_POR_CLIQUE,
    MAX_COMPARTILHAMENTOS,
    VISUALIZACOES_POR_COMPARTILHAMENTO,
    VISUALIZACOES_POR_REAL
} from "../../utils/CalculadoraAlcanceAnuncios";



test('getVisualizacoesPorInvestimento(valor), deve retornar quantidade de visualizações', () => {
    const valor = 10;
    const visualizacoes = CalculadoraAlcanceAnuncios.getVisualizacoesPorInvestimento(valor)
    const valorEsperado = Math.floor(VISUALIZACOES_POR_REAL * valor);
    expect(visualizacoes).toEqual(valorEsperado)
})


test('getVisualizacoes(compartilhamentos), deve retornar quantidade de visualizações', () => {
    const compartilhamentos = 100;
    const visualizacoes = CalculadoraAlcanceAnuncios.getVisualizacoes(compartilhamentos)
    const valorEsperado = Math.floor(VISUALIZACOES_POR_COMPARTILHAMENTO * compartilhamentos);
    expect(visualizacoes).toEqual(valorEsperado)
})


test('getCliques(visualizacoes), deve retornar quantidade de cliques', () => {
    const visualizacoes = 100;
    const valorEsperado = Math.floor(CLIQUES_POR_VISUALIZACAO * visualizacoes);

    const cliques = CalculadoraAlcanceAnuncios.getCliques(visualizacoes)
    expect(cliques).toEqual(valorEsperado)
})


test('getCompatilhamentos(cliques), deve retornar quantidade de compartilhamentos)', () => {
    const cliques = 100;
    const valorEsperado = Math.floor(COMPARTILHAMENTO_POR_CLIQUE * cliques)
    const compartilhamentos = CalculadoraAlcanceAnuncios.getCompatilhamentos(cliques)
    expect(compartilhamentos).toEqual(valorEsperado)
})


test('geraCompartilhamento(cliques), deve retornar true ou false', () => {
    const cliques = 7;
    const valorEsperado = cliques > (1 / COMPARTILHAMENTO_POR_CLIQUE) ? true : false;

    const geraCompartilhamento = CalculadoraAlcanceAnuncios.geraCompartilhamento(cliques)
    expect(geraCompartilhamento).toEqual(valorEsperado)
})


test('.gerarCompartilhamento(cliques), deve retornar o numero de visualizações', () => {
    var relatorio = CalculadoraAlcanceAnuncios.getRelatorioCompartilhamento(0)
    expect(relatorio.numTotalVisualizacoes).toEqual(0)


    const cliques = 100;
    var visualizacoes = CalculadoraAlcanceAnuncios.getRelatorioCompartilhamento(cliques)

    var numCliques = cliques;
    var numTotalVisualizacoesPorCompartilhamento = 0;
    var numCompartilhamentosRealizados = 0;
    while ((numCompartilhamentosRealizados < MAX_COMPARTILHAMENTOS) && CalculadoraAlcanceAnuncios.geraCompartilhamento(numCliques)) {
        const numCompartilhamentos = CalculadoraAlcanceAnuncios.getCompatilhamentos(numCliques);
        const numVisualizacoesPorCompartilhamento = CalculadoraAlcanceAnuncios.getVisualizacoes(numCompartilhamentos);
        numCliques = CalculadoraAlcanceAnuncios.getCliques(numVisualizacoesPorCompartilhamento);
        numTotalVisualizacoesPorCompartilhamento += numVisualizacoesPorCompartilhamento;
        numCompartilhamentosRealizados++;
    }

    expect(visualizacoes.numTotalVisualizacoes).toEqual(numTotalVisualizacoesPorCompartilhamento)
})


test('calcular(valor), deve retornar o numero total de visualizações do anuncio', () => {
    const valor = 100;


    const numVisualizacoesInvestimentoInicial = CalculadoraAlcanceAnuncios.getVisualizacoesPorInvestimento(valor);
    const numClicksInvestimentoInicial = CalculadoraAlcanceAnuncios.getCliques(numVisualizacoesInvestimentoInicial);
    const { numTotalVisualizacoes } = CalculadoraAlcanceAnuncios.getRelatorioCompartilhamento(numClicksInvestimentoInicial);

    const valorEsperado = Math.floor(numVisualizacoesInvestimentoInicial + numTotalVisualizacoes)

    const { visualizacoes } = CalculadoraAlcanceAnuncios.calcular(valor)

    expect(visualizacoes).toEqual(valorEsperado)
})