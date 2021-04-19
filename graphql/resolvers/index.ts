import { userResolvers } from "./user";
import { pollResolvers } from "./poll";
import { topicResolvers } from "./pollCategories";
import { imageResolvers } from "./image";

const resolvers = [userResolvers, pollResolvers, topicResolvers, imageResolvers];

export default resolvers;
