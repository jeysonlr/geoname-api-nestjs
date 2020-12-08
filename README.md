## Descricao

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Rodando com Docker

```docker
$ git config core.autocrlf false

$ docker-compose up -d --build

```

## Rodando localmente

```bash
$ git config core.autocrlf false

$ yarn install
```

## Acessando sitema gerenciador de banco de dados (SGBD)
```
localhot:8080

utilizar as credencias utilizadas no docker-compose.yml

exemplo:
SISTEMA: postgreSQL
SERVIDOR: pgsql (nome do container utilizado no docker-compose.yml)
USUARIO: (usuario e senha utilizados no docker-compose.yml)
SENHA: (usuario e senha utilizados no docker-compose.yml)
BASE DE DADOS: nao precisa informar valor

```

## Documentacão de rotas da api
````
http://localhost:7001/documentation
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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
