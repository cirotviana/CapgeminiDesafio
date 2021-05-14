import { getRepository, Repository } from "typeorm";
import { ClienteModel } from "../Cliente.model";


export class ClienteDAO{
    clienteRepository: Repository<ClienteModel>
    
    constructor(){
        this.clienteRepository = getRepository(ClienteModel)
    }

    async getById(id:number){
        return this.clienteRepository.findOne(id)
    }

    async create(cliente:any){
        return this.clienteRepository.save(cliente)
    }
    





}