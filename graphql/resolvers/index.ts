import { userResolvers } from "./user";
import { pollResolvers } from "./poll";
// const userResolver = require("./user");
// const pollResolver = require("./poll");

const resolvers = [userResolvers, pollResolvers];

export default resolvers;
