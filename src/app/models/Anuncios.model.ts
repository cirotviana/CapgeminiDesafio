import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ClienteModel } from "./Cliente.model";

@Entity()
export class AnunciosModel extends BaseEntity {

    constructor(nome: string , dataInicio: Date , dataTermino: Date , investimentoPorDia: number , cliente: ClienteModel ) {
        super()
        this.nome = nome
        this.dataInicio = dataInicio
        this.dataTermino = dataTermino
        this.investimentoPorDia = investimentoPorDia
        this.cliente = cliente
    }

    @PrimaryGeneratedColumn()
    id!: number ;

    @Column({nullable:false})
    nome: string ;

    @Column({nullable:false})
    dataInicio: Date ;

    @Column({nullable:false})
    dataTermino: Date ;

    @Column({nullable:false})
    investimentoPorDia: number ;

    @ManyToOne(() => ClienteModel, cliente => cliente.anuncios)
    cliente: ClienteModel ;

    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;

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