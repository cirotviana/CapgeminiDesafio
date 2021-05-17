import { ClientesModel } from "../../DAO/models/Clientes.model";
import { ClienteDAO } from "../../DAO/ClienteDAO";

class ClienteService {

    async getClienteById(id: any) {
        const idInt = parseInt(id);
        if (isNaN(idInt))
            return ({ status: 400, data: {} })

        const cliente = await new ClienteDAO().getById(idInt);
        if (!cliente) return ({ status: 404, data: {} })

        return { status: 200, data: cliente };
    }

    async createCliente(nome: string) {
        const newCliente = new ClientesModel(nome);
        const cliente = await new ClienteDAO().create(newCliente)
        if (!cliente) {
            return ({ status: 400, data: {} })
        }
        return { status: 201, data: cliente }
    }
}

export default new ClienteService();