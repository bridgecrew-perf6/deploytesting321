import { userResolvers } from "./user";
import { pollResolvers } from "./poll";
import { topicResolvers } from "./pollCategories";

// const userResolver = require("./user");
// const pollResolver = require("./poll");

const resolvers = [userResolvers, pollResolvers, topicResolvers];

export default resolvers;
