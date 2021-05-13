//Test EndPoints - End to End Test

import request from 'supertest'
import app from '../app'

describe('Get Anuncios Endpoint', () => {
    it('Deveria retornar um Anuncio', async () => {
      const res = await request(app)
        .get('/api')
        
      expect(res.statusCode).toEqual(200)
    })
    it('Deveria salvar um Anuncio', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({
          userId: 1,
          title: 'test is cool',
        })
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('post')
    })
  })

