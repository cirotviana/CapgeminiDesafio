import { getRepository, Repository } from "typeorm";
import { ClientesModel } from "./models/Clientes.model";


export class ClienteDAO {
    clienteRepository: Repository<ClientesModel>

    constructor() {
        this.clienteRepository = getRepository(ClientesModel)
    }

    async getById(id: number) {
        return this.clienteRepository.findOne(id)
    }

    async create(cliente: any) {
        return this.clienteRepository.save(cliente)
    }

}