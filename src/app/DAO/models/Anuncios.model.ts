import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ClientesModel } from "./Clientes.model";

@Entity()
export class AnunciosModel extends BaseEntity {

    constructor(nome: string, dataInicio: Date, dataTermino: Date, investimentoPorDia: number, cliente: ClientesModel) {
        super()
        this.nome = nome
        this.dataInicio = dataInicio
        this.dataTermino = dataTermino
        this.investimentoPorDia = investimentoPorDia
        this.cliente = cliente
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    nome!: string;

    @Column({ nullable: false })
    dataInicio!: Date;

    @Column({ nullable: false })
    dataTermino!: Date;

    @Column({ nullable: false, type: "double precision"})
    investimentoPorDia!: number;

    @ManyToOne(() => ClientesModel, cliente => cliente.anuncios, {eager : true})
    cliente!: ClientesModel;

    relatorio!: any;
}