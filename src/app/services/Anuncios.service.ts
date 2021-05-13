import { AnunciosDAO } from "../models/DAO/AnunciosDAO";

export class AnunciosService {



    async store(body:any) {
/*         const user = await this.check(body.email)

        if (!user) {
            return {
                user: await this.user.create({ ...body }),
                ...Response.userCreated
            }
        }

        return Response.userFound */
    }


    async get(id:any) {

        const anuncio = new AnunciosDAO().get(id);
        return anuncio;
/*         const user = await this.user.findByPk(id)

        if (!user) {
            return Response.userNotFound
        }

        return {
            user,
            ...Response.userOk
        } */
    }

}