import { ApolloServer } from "apollo-server-micro";
// import jwt from "jsonwebtoken";
import connectDb from "../../lib/mongoose";
import typeDefs from "../../graphql/typeDefs";
import resolvers from "../../graphql/resolvers";
import { isAuthenticated } from "../../graphql/middleware";
import withCookies from "../../graphql/middleware/cookie";
import { Request, Response } from "express-serve-static-core";
import dataLoaders from "../../graphql/loaders";
import { PubSub } from "apollo-server";
import Cors from "micro-cors";
import { send } from "micro";

interface MyContext {
  req: Request;
  res: Response;
  connection: any;
}

const cors = Cors({
  origin: "https://www.poldit.com",
  allowMethods: ["GET", "POST", "OPTIONS"],
});

const pubsub = new PubSub();

const context = async ({ req, res, connection }: MyContext) => {
  const msgHeader = connection ? connection.context : req;

  //Put middleware in here
  return {
    req,
    res,
    isAuth: isAuthenticated(msgHeader),
    // isAuth: isAuthenticated(req),
    dataLoaders,
    pubsub,
  };
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  subscriptions: {
    path: "/api/graphql",
    keepAlive: 9000,
    onConnect: (connectionParams, webSocket, context) => {
      return { headers: context.request.headers };
    },
  },
  playground: {
    subscriptionEndpoint: "/api/graphql",
    settings: {
      "request.credentials": "same-origin",
    },
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const graphqlWithSubscriptionHandler = (req: any, res: any, next: any) => {
  if (!res.socket.server.apolloServer) {
    console.log(`PoldIt Server Started`);

    apolloServer.installSubscriptionHandlers(res.socket.server);
    const handler = apolloServer.createHandler({ path: "/api/graphql" });
    req.method === "OPTIONS"
      ? res.end()
      : (res.socket.server.apolloServer = cors(handler));
  }

  return res.socket.server.apolloServer(req, res, next);
};

export default connectDb(withCookies(graphqlWithSubscriptionHandler));
