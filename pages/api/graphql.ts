import { ApolloServer } from "apollo-server-micro";
// import jwt from "jsonwebtoken";
import connectDb from "../../lib/mongoose";
import typeDefs from "../../graphql/typeDefs";
import resolvers from "../../graphql/resolvers";
import { isAuthenticated } from "../../graphql/middleware";
import withCookies from "../../graphql/middleware/cookie";
import { Request, Response } from "express-serve-static-core";
import { pollLoader, userLoader } from "../../graphql/loaders";

interface MyContext {
  req: Request;
  res: Response;
}

const context = async ({ req, res }: MyContext) => {
  // refreshAppToken(req, res);
  // req && generateAuthFromCookie(req);
  //Put middleware in here
  return {
    req,
    res,
    isAuth: isAuthenticated(req),
    userLoader: userLoader(),
    pollLoader: pollLoader(),
    // isAuth: await isAuthenticated(req),
    // hasCookie: await hasCookie(req),
  };
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = apolloServer.createHandler({ path: "/api/graphql" });
export default connectDb(withCookies(handler));
