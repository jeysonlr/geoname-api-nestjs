## Descricao

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Iniciando container do banco de dados e SGBD com Docker
```bash

$ docker-compose up -d --build
```

## Acessando sitema gerenciador de banco de dados (SGBD)
```
acesse via http://localhot:8080

utilizar as credencias informadas no docker-compose.yml para acessar SGBD

exemplo:
SISTEMA: postgreSQL
SERVIDOR: geoname_pgsql (nome do container utilizado no docker-compose.yml)
USUARIO: pguser (usuario e senha utilizados no docker-compose.yml)
SENHA: pgpassword (usuario e senha utilizados no docker-compose.yml)
BASE DE DADOS: nao precisa informar valor

Após acessar o SGBD, crie uma base de dados chamada "geoname"

```

## Iniciando aplicacao

```bash
$ git config core.autocrlf false

$ yarn
    ou
$ npm install
```

### BONUS
```
Caso nao queira popular de 1 em 1,

Lembrando que essa rota faz consumo de uma API externa, sussetiva a ser desativada ou alterada pelo fornecedor

Rota para popular ou limpar tabelas de estado e cidade, utilizando api do IBGE ( https://servicodados.ibge.gov.br/api/docs/localidades )

localhost:7001/populateorexclude

```

## Documentacão de rotas da api
```
http://localhost:7001/documentation
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
