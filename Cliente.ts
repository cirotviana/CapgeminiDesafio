class AnunciosCliente {

    idCliente: Number;

    anuncios: Array<Anuncios>;

    investimentoTotal: Number;
    totalVisualizacoes: Number;
    totalCliques: Number;
    totalCompartilhamentos: Number;

    //Os relatórios poderão ser filtrados por intervalo de tempo e cliente.

    getRelatorioDeAnunciosPorIntervaloDeTempo() {

    }

    //Classe cliente
    getRelatorioDeAnunciosPorCliente() {
        let totalValorTotalInvestidoPorCliente: Number = 0,
            totalQuantMaxVisualizaçõesPorCliente: Number = 0,
            totalQuantMaxCliquesPorCliente: Number = 0,
            totalQuantMaxCompartilhamentosPorCliente: Number = 0;

        this.anuncios.forEach((anuncio: Anuncios) => {
            const {
                valorTotalInvestido,
                quantMaxVisualizações,
                quantMaxCliques,
                quantMaxCompartilhamentos
            } = anuncio.getRelatorio();
            totalValorTotalInvestidoPorCliente += valorTotalInvestido;
            totalQuantMaxVisualizaçõesPorCliente += quantMaxVisualizações;
            totalQuantMaxCliquesPorCliente += quantMaxCliques;
            totalQuantMaxCompartilhamentosPorCliente += quantMaxCompartilhamentos;
        })

        return {
            investimento: totalValorTotalInvestidoPorCliente,
            visualizacoes: totalQuantMaxVisualizaçõesPorCliente,
            cliques: totalQuantMaxCliquesPorCliente,
            compartilhamentos: totalQuantMaxCompartilhamentosPorCliente
        }
    }
}