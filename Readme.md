# Capgemini-Desafio

## O problema
---------------------------------------------------
A agência Divulga Tudo precisa de um programa para gerenciar os seus anúncios online. O objetivo dos anúncios faz parte de uma campanha nas redes sociais. O sistema de gerenciamento permitirá a gestão do anúncio e o rastreio dos resultados da campanha.

Este programa será composto de duas partes:

* 1ª Parte – Uma calculadora de alcance de anúncio online.

* 2ª Parte - Um sistema de cadastro de anúncios.


## A Stack escolhida

•   Back-end : node.js + express.js + typeorm

•   Banco de dados: postgres

•   Jest e supertest para Testes.



# Como Testar
    
    
   Para rodar a aplicação abra a pasta no terminal e rode os seguintes comandos:

    npm install
    
    
   Para rodar os testes: 

    npm run test
    
    
   Para compilar e rodar a API: 

    npm start
 

# API Endpoints Disponíveis:


### Anuncios

    /v1/anuncios                  GET     -Retorna Todos os anúncios
    /v1/anuncios/:id              GET     -Retorna o anuncio especificado

    /v1/anuncios                  POST    -Cadastra um novo anúncio
    dados: 
    {
        nome: '<nome>', 
        investimentoPorDia: '<investimentoPorDia>', 
        cliente: '<clienteId>', 
        dataInicio: '<dataInicio>', 
        dataTermino: '<dataTermino>'
    }

### Relatórios

    /v1/anuncios/:id/relatorio    GET     -Retorna o relatorio do anúncio
    /v1/anuncios/relatorio?...    GET     -Retorna os anúncios filtrados por intervalo de tempo e cliente
    exemplo:
        /v1/anuncios/relatorio?dataInicio=10/05/2021&dataTermino=15/05/2021&cliente=1  


### Clientes
    /v1/<clientesId>              GET     -Retorna o cliente especificado 

    /v1/clientes                  POST    -Cadastra um novo cliente
    dados:
    {
        nome: '<nome>'
    }





