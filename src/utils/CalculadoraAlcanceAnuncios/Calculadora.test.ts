import {
    CalculadoraDeAlcanceDeAnuncios,
    CLIQUES_POR_VISUALIZACAO,
    COMPARTILHAMENTO_POR_CLIQUE,
    MAX_COMPARTILHAMENTOS,
    VISUALIZACOES_POR_COMPARTILHAMENTO,
    VISUALIZACOES_POR_REAL
} from "./Calculadora";



test('getVisualizacoesPorInvestimento(valor), deve retornar quantidade de visualizações', () => {
    const valor = 0.5;
    const visualizacoes = CalculadoraDeAlcanceDeAnuncios.getVisualizacoesPorInvestimento(valor)
    const valorEsperado = Math.floor(VISUALIZACOES_POR_REAL * valor);
    expect(visualizacoes).toEqual(valorEsperado)
})


test('getNumVisualizacoes(compartilhamentos), deve retornar quantidade de visualizações', () => {
    const compartilhamentos = 100;
    const visualizacoes = CalculadoraDeAlcanceDeAnuncios.getVisualizacoes(compartilhamentos)
    const valorEsperado = Math.floor(VISUALIZACOES_POR_COMPARTILHAMENTO * compartilhamentos);
    expect(visualizacoes).toEqual(valorEsperado)
})


test('getNumCliques(visualizacoes), deve retornar quantidade de cliques', () => {
    const visualizacoes = 100;
    const valorEsperado = Math.floor(CLIQUES_POR_VISUALIZACAO * visualizacoes);

    const cliques = CalculadoraDeAlcanceDeAnuncios.getCliques(visualizacoes)
    expect(cliques).toEqual(valorEsperado)
})


test('getNumCompatilhamentos(cliques), deve retornar quantidade de compartilhamentos)', () => {
    const cliques = 100;
    const valorEsperado = Math.floor(COMPARTILHAMENTO_POR_CLIQUE * cliques)
    const compartilhamentos = CalculadoraDeAlcanceDeAnuncios.getCompatilhamentos(cliques)
    expect(compartilhamentos).toEqual(valorEsperado)
})


test('geraCompartilhamento(cliques), deve retornar true ou false', () => {
    const cliques = 7;
    const valorEsperado = cliques > (1 / COMPARTILHAMENTO_POR_CLIQUE) ? true : false;

    const geraCompartilhamento = CalculadoraDeAlcanceDeAnuncios.geraCompartilhamento(cliques)
    expect(geraCompartilhamento).toEqual(valorEsperado)
})


test('.gerarCompartilhamento(cliques), deve retornar o numero de visualizações', () => {
    var visualizacoes = CalculadoraDeAlcanceDeAnuncios.getRelatorioCompartilhamento(0)
    expect(visualizacoes).toEqual(0)


    const cliques = 100;
    var visualizacoes = CalculadoraDeAlcanceDeAnuncios.getRelatorioCompartilhamento(cliques)

    var numCliques = cliques;
    var numTotalVisualizacoesPorCompartilhamento = 0;
    var numCompartilhamentosRealizados = 0;
    while ((numCompartilhamentosRealizados < MAX_COMPARTILHAMENTOS) && CalculadoraDeAlcanceDeAnuncios.geraCompartilhamento(numCliques)) {
        const numCompartilhamentos = CalculadoraDeAlcanceDeAnuncios.getCompatilhamentos(numCliques);
        const numVisualizacoesPorCompartilhamento = CalculadoraDeAlcanceDeAnuncios.getVisualizacoes(numCompartilhamentos);
        numCliques = CalculadoraDeAlcanceDeAnuncios.getCliques(numVisualizacoesPorCompartilhamento);
        numTotalVisualizacoesPorCompartilhamento += numVisualizacoesPorCompartilhamento;
        numCompartilhamentosRealizados++;
    }

    expect(visualizacoes).toEqual(numTotalVisualizacoesPorCompartilhamento)
})


test('calcular(valor), deve retornar o numero total de visualizações do anuncio', () => {
    const valor = 100;


    const numVisualizacoesInvestimentoInicial = CalculadoraDeAlcanceDeAnuncios.getVisualizacoesPorInvestimento(valor);
    const numClicksInvestimentoInicial = CalculadoraDeAlcanceDeAnuncios.getCliques(numVisualizacoesInvestimentoInicial);
    const {numTotalVisualizacoes} = CalculadoraDeAlcanceDeAnuncios.getRelatorioCompartilhamento(numClicksInvestimentoInicial);

    const valorEsperado = Math.floor(numVisualizacoesInvestimentoInicial + numTotalVisualizacoes)

    const visualizacoes = CalculadoraDeAlcanceDeAnuncios.calcular(valor)

    expect(visualizacoes).toEqual(valorEsperado)
})
