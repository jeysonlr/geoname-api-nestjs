## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ git config core.autocrlf false

$ yarn install
```

```docker

$ docker-compose up -d --build

```

## sitema gerenciador de banco de dados (SGBD)
```
localhot:8080

utilizar as credencias utilizadas no docker-compose.yml

example:
SISTEMA: postgreSQL
SERVIDOR: pgsql (nome do container)
USUARIO: (usuario e senha utilizados no docker-compose.yml)
SENHA: (usuario e senha utilizados no docker-compose.yml)
BASE DE DADOS: nao precisa informar valor

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
