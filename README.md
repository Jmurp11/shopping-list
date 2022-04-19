## Setting up SQL Connection

- create a .env file in the server directory and add SQL Connection info to it

* example:

    `
    HOST=localhost
    DBPORT=5432
    USERNAME=postgres
    PASSWORD=postgres
    DB=veritone-coding-challenge
    `

## Installing dependencies

### client

* using npm

    `cd client && npm install`

* using yarn

    `cd client && yarn`

### server

* using npm

    `cd server && npm install`

* using yarn

    `cd server && yarn`

## Run React Frontend

- open a new terminal and run the following:

  `cd client && yarn start`

- the application will be accessible at localhost:3000

## Run GraphQL Server

- open a new terminal and run the following:

  `cd server && yarn start`

- the server will be accessible at localhost:4000/graphql
