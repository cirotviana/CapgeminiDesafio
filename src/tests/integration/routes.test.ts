import request from 'supertest'
import faker from 'faker'
import {createConnection, getConnection } from 'typeorm';
import app from '../../app'
import { dbConfig } from '../../database/db';

describe('Testa principais os endpoints', () => {
  beforeAll(async () => {
    let config = { ...dbConfig };
    await createConnection(config)
      .catch((err: any) => { console.log('Não foi possível conectar com o BD.\n' + err) })
    await getConnection().query('DROP DATABASE IF EXISTS testDesafioCapgemini');
    await getConnection().query('CREATE DATABASE testDesafioCapgemini');

    await getConnection().close()
    config.database = 'testdesafiocapgemini';
    await createConnection(config)
      .catch((err: any) => { console.log('Não foi possível conectar com o BD.\n' + err) })

  });

  afterAll(async () => {
    await getConnection().close();
  });
  let cliente: string;
  describe('Insere um cliente e confere se foi inserido', () => {

    it('Post /clientes, deveria salvar um Cliente', async () => {
      const res = await request(app)
        .post('/v1/clientes')
        .send({
          nome: faker.name.firstName()
        })
      expect(res.statusCode).toEqual(201)
      cliente = res.body.data.id;
    })

    it('Get /clientes/:id, deveria retornar o cliente especificado', async () => {
      const res = await request(app)
        .get('/v1/clientes/' + cliente)
      expect(res.body.data.id).toEqual(cliente);
      expect(res.statusCode).toEqual(200)
    })

    describe('Insere um anuncio, confere se foi inserido e geraRelatorio', () => {
      let anuncio: string;

      it('Post /anuncios, deveria salvar um Anuncio', async () => {
        let res: any;
        for (let i = 0; i < 5; i++) {
          res = await request(app)
            .post('/v1/anuncios')
            .send({
              nome: "Anuncio do(a) " + faker.vehicle.model(),
              dataInicio: "15/05/2021",
              dataTermino: "17/05/2021",
              investimentoPorDia: faker.finance.amount(0, 1000),
              cliente: cliente
            })
        }
        expect(res.statusCode).toEqual(201)
        anuncio = res.body.data.id;
      })

      it('Get /anuncios/:id, deveria retornar um Anuncio', async () => {
        const res = await request(app)
          .get('/v1/anuncios/' + anuncio)
        expect(res.body.data.id).toEqual(anuncio);
        expect(res.statusCode).toEqual(200)
      })

      it('Get /anuncios, deveria retornar todos os anuncios', async () => {
        const res = await request(app)
          .get('/v1/anuncios/')
        expect(res.statusCode).toEqual(200)
      })

      describe('Geração de relatórios', () => {

        it('Get Relatorio por id /anuncios/:id/relatorio, deveria retornar o relatório do anuncio especificado', async () => {
          const res = await request(app)
            .get(`/v1/anuncios/${anuncio}/relatorio`)
          expect(res.body.relatorio).not.toBeNull();
          expect(res.statusCode).toEqual(200)
        })

        it('Get Relatório por Intervalo de tempo e cliente /anuncios/relatorio', async () => {
          const res = await request(app)
            .get(`/v1/anuncios/relatorio?dataInicio=15/05/2021&dataTermino=20/05/2021&cliente=${cliente}`)
          expect(res.body.relatorio).not.toBeNull();
          expect(res.statusCode).toEqual(200)
        })
      })
    })
  })
})

