<h1 align="center"><strong>GraphQL Prisma TypeScript Server Boilerplate</strong></h1>

<br />

<div align="center"><img src="https://imgur.com/1MfnLVl.png" /></div>

<div align="center"><strong>Just another GraphQL server boilerplate (╯ಠ_ರೃ)╯︵ ┻━┻</strong></div>

<br />

[![Build Status](https://travis-ci.org/ngshiheng/graphql-prisma-typescript.svg?branch=master)](https://travis-ci.org/ngshiheng/graphql-prisma-typescript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/ngshiheng/graphql-prisma-typescript/blob/master/LICENSE)

A GraphQL, Prisma, TypeScript server boilerplate with authentication setup

# Tech Stacks

-   [graphql-yoga](https://github.com/prisma-labs/graphql-yoga)
-   [prisma](https://github.com/prisma/prisma)
-   [type-graphql](https://typegraphql.ml/)
-   [typescript](https://www.typescriptlang.org/)
-   [graphql-query-complexity](https://github.com/slicknode/graphql-query-complexity)

# Usage

## Setup environment variables

```bash
export ENDPOINT="/graphql"
export EXPIRY="12h"
export PORT=4000
export PRISMA_GQL_ENDPOINT="https://xxx.xxx.xxx"
export SECRET="my-app-secret"
```

## Installing Prisma CLI

```bash
npm i -g prisma
prisma init
prisma deploy
```

-   For quick setup, choose `Demo server + MySQL database` option
-   Set your prisma endpoint to `PRISMA_GQL_ENDPOINT` inside your `bash_profile` or `bashrc` or any environment variable of your system
-   More information on [setting up Prisma](https://www.prisma.io/docs/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/)

## Start

```
yarn install
yarn start
```

-   Run `prisma deploy` every time you change your prisma data models

## Start with Docker

-   Run `docker-compose up -d` run this project in a docker container

# Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change

## Steps

1. Fork this
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
