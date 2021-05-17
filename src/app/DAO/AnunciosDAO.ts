import { EntityManager, getManager, getRepository, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { AnunciosModel } from "./models/Anuncios.model";

export class AnunciosDAO {
    anunciosRepository: Repository<AnunciosModel>;

    constructor() {
        this.anunciosRepository = getRepository(AnunciosModel);
    }

    async findById(id: number) {
        return this.anunciosRepository.findOne(id)
    }

    async getAll() {
        return this.anunciosRepository.find()
    }

    async findByClienteAndInterval(query: any) {
        return this.anunciosRepository.find({ where: query })
    }

    async create(anuncio: AnunciosModel) {
        return this.anunciosRepository.save(anuncio);
    }
}
