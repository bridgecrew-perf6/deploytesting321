import { userTypeDefs } from "./user";
import { pollTypeDefs } from "./poll";
import { topicTypeDefs } from "./topic";
import { chatTypeDefs } from "./chat";
import { rootTypeDefs } from "./root";

const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  pollTypeDefs,
  topicTypeDefs,
  chatTypeDefs,
];

export default typeDefs;
