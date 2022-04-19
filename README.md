## Summary

* My front end experience is more heavily in Angular and I have not had much exposure to React.  I noted with TODO's some areas where my knowledge of best practices may have come up short, but I wanted to ensure that I completed the challenge in a reasonable time frame.  With that said, the application matches with the mock up images.  I hope that this shows my ability to pick up React quickly.

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
