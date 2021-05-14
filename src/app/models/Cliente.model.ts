import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnunciosModel } from "./Anuncios.model";

@Entity()
export class ClienteModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number ;
    
    @OneToMany(() => AnunciosModel, anuncios => anuncios.cliente)
    anuncios!: AnunciosModel[];


/*     investimentoTotal: number;
    totalVisualizacoes: number;
    totalCliques: number;
    totalCompartilhamentos: number; */

/*     constructor(){
        this.idCliente = 0

        this.anuncios = [];

        this.investimentoTotal = 0;
        this.totalVisualizacoes = 0;
        this.totalCliques = 0;
        this.totalCompartilhamentos = 0;
    }
 */
    //Os relatórios poderão ser filtrados por intervalo de tempo e cliente.
/* 
    getRelatorioDeAnunciosPorIntervaloDeTempo() {

    } */

/*     //Classe cliente
    getRelatorioDeAnunciosPorCliente() {
        let totalValorTotalInvestidoPorCliente: number = 0,
            totalQuantMaxVisualizaçõesPorCliente: number = 0,
            totalQuantMaxCliquesPorCliente: number = 0,
            totalQuantMaxCompartilhamentosPorCliente: number = 0;

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
    } */
}