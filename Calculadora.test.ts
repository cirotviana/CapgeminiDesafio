import {
    CalculadoraDeAlcanceDeAnuncios,
    clicksPorVisualizacao,
    compartilhamentoPorClique,
    numMaxCompartilhamentos,
    visualizacoesPorCompartilhamento,
    visualizacoesPorReal
} from "./Calculadora";



test('getVisualizacoesPorInvestimento(valor), deve retornar quantidade de visualizações', () => {
    const valor = 0.5;
    const visualizacoes = CalculadoraDeAlcanceDeAnuncios.getVisualizacoesPorInvestimento(valor)
    const valorEsperado = Math.floor(visualizacoesPorReal * valor);
    expect(visualizacoes).toEqual(valorEsperado)
})


test('getNumVisualizacoes(compartilhamentos), deve retornar quantidade de visualizações', () => {
    const compartilhamentos = 100;
    const visualizacoes = CalculadoraDeAlcanceDeAnuncios.getNumVisualizacoes(compartilhamentos)
    const valorEsperado = Math.floor(visualizacoesPorCompartilhamento * compartilhamentos);
    expect(visualizacoes).toEqual(valorEsperado)
})


test('getNumCliques(visualizacoes), deve retornar quantidade de cliques', () => {
    const visualizacoes = 100;
    const valorEsperado = Math.floor(clicksPorVisualizacao * visualizacoes);

    const cliques = CalculadoraDeAlcanceDeAnuncios.getNumCliques(visualizacoes)
    expect(cliques).toEqual(valorEsperado)
})


test('getNumCompatilhamentos(cliques), deve retornar quantidade de compartilhamentos)', () => {
    const cliques = 100;
    const valorEsperado = Math.floor(compartilhamentoPorClique * cliques)
    const compartilhamentos = CalculadoraDeAlcanceDeAnuncios.getNumCompatilhamentos(cliques)
    expect(compartilhamentos).toEqual(valorEsperado)
})


test('geraCompartilhamento(cliques), deve retornar true ou false', () => {
    const cliques = 7;
    const valorEsperado = cliques > (1 / compartilhamentoPorClique) ? true : false;

    const geraCompartilhamento = CalculadoraDeAlcanceDeAnuncios.geraCompartilhamento(cliques)
    expect(geraCompartilhamento).toEqual(valorEsperado)
})


test('getVisualizacaoPorCompartilhamento(cliques), deve retornar o numero de visualizações', () => {
    var visualizacoes = CalculadoraDeAlcanceDeAnuncios.getVisualizacaoPorCompartilhamento(0)
    expect(visualizacoes).toEqual(0)


    const cliques = 100;
    var visualizacoes = CalculadoraDeAlcanceDeAnuncios.getVisualizacaoPorCompartilhamento(cliques)

    var numCliques = cliques;
    var numTotalVisualizacoesPorCompartilhamento = 0;
    var numCompartilhamentosRealizados = 0;
    while ((numCompartilhamentosRealizados < numMaxCompartilhamentos) && CalculadoraDeAlcanceDeAnuncios.geraCompartilhamento(numCliques)) {
        const numCompartilhamentos = CalculadoraDeAlcanceDeAnuncios.getNumCompatilhamentos(numCliques);
        const numVisualizacoesPorCompartilhamento = CalculadoraDeAlcanceDeAnuncios.getNumVisualizacoes(numCompartilhamentos);
        numCliques = CalculadoraDeAlcanceDeAnuncios.getNumCliques(numVisualizacoesPorCompartilhamento);
        numTotalVisualizacoesPorCompartilhamento += numVisualizacoesPorCompartilhamento;
        numCompartilhamentosRealizados++;
    }

    expect(visualizacoes).toEqual(numTotalVisualizacoesPorCompartilhamento)
})


test('calcular(valor), deve retornar o numero total de visualizações do anuncio', () => {
    const valor = 100;


    const numVisualizacoesInvestimentoInicial = CalculadoraDeAlcanceDeAnuncios.getVisualizacoesPorInvestimento(valor);
    const numClicksInvestimentoInicial = CalculadoraDeAlcanceDeAnuncios.getNumCliques(numVisualizacoesInvestimentoInicial);
    const numVisualizacoesPorCompartilhamento = CalculadoraDeAlcanceDeAnuncios.getVisualizacaoPorCompartilhamento(numClicksInvestimentoInicial);

    const valorEsperado = Math.floor(numVisualizacoesInvestimentoInicial + numVisualizacoesPorCompartilhamento)

    const visualizacoes = CalculadoraDeAlcanceDeAnuncios.calcular(valor)

    expect(visualizacoes).toEqual(valorEsperado)
})
