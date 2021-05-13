import { EntityManager, getManager } from "typeorm";
import { Anuncios } from "../Anuncios";



export class AnunciosDAO{
    entityManager : EntityManager ;

    constructor(){
        this.entityManager = getManager();
    }

    get(id:number){
        return this.entityManager.findOne(Anuncios, id)
    }

    getAll(){
        this.entityManager
    }

    create(){
        
    }






}