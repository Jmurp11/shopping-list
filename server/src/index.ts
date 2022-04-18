import "dotenv/config";
import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./datasource";

(async () => {
  const app = express();

  try {
    await AppDataSource.initialize();
  } catch (err) {
    console.log(err);
  }

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [`${__dirname}/modules/**/*.ts`],
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  const httpServer = http.createServer(app);

  const port = process.env.PORT || 4000;

  httpServer.listen(port, async () => {
    console.log(`Server started on port ${port}...`);
  });
})();
