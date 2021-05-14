import * as HTTP from './httpStatus'

export const createdMessage = {
  type: 'Created',
  status: HTTP.CREATED,
  describe: 'Recurso criado com sucesso.'
}

export const badRequestMessage = {
  type: 'BadRequest',
  status: HTTP.BAD_REQUEST,
  describe: 'Erro no input do cliente.'
}

export const sucessMessage = {
  type: 'Sucess',
  status: HTTP.OK,
  describe: 'Sucesso.'
}


