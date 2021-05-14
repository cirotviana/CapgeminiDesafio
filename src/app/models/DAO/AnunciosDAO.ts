import { EntityManager, getManager, getRepository, Repository } from "typeorm";
import { AnunciosModel } from "../Anuncios.model";

export class AnunciosDAO{
    anunciosRepository : Repository<AnunciosModel>;

    constructor(){
        this.anunciosRepository = getRepository(AnunciosModel);
    }

    async getById(id:number){
        return this.anunciosRepository.findOne(id);
    }

    async getAll(){
        return this.anunciosRepository.find()
    }

    async create(anuncio : AnunciosModel){
        return this.anunciosRepository.save(anuncio);
    }

    async getAnunciosByClientId(id: number){
        return this.anunciosRepository.find({where: [{cliente : id}]})
    }
}
