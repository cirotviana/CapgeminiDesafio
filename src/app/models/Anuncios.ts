import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";

@Entity()
export class Anuncios {

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    nome: string | undefined;

    @Column()
    dataInicio: Date | undefined;

    @Column()
    dataTermino: Date | undefined;

    @Column()
    investimentoPorDia: number | undefined;

    @ManyToOne(() => Cliente, cliente => cliente.anuncios)
    cliente: Cliente | undefined;

    //O sistema fornecerá os relatórios de cada anúncio contendo:
    getRelatorio() {
        return {
            valorTotalInvestido: 1,
            quantMaxVisualizações: 2,
            quantMaxCliques: 3,
            quantMaxCompartilhamentos: 4
        }
    }



}