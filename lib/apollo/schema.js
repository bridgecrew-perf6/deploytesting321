import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "../../graphql/typeDefs";
import resolvers from "../../graphql/resolvers";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
