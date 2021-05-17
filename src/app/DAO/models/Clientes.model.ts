import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnunciosModel } from "./Anuncios.model";

@Entity()
export class ClientesModel extends BaseEntity {
    constructor(name:string){
        super();
        this.name = name;
    }

    @PrimaryGeneratedColumn()
    id!: number ;

    @Column()
    name!: String;
    
    @OneToMany(() => AnunciosModel, anuncios => anuncios.cliente)
    anuncios!: AnunciosModel[];

}