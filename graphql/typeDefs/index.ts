import { userTypeDefs } from "./user";
import { pollTypeDefs } from "./poll";
import { topicTypeDefs } from "./topic";
import { chatTypeDefs } from "./chat";
import { otherTypeDefs } from "./other";
import { rootTypeDefs } from "./root";
<<<<<<< HEAD
=======
import { internalUserTypeDefs } from "./internalUsers";
import { privilegeTypeDef } from "./privilegeTypeDef";
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5

const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  pollTypeDefs,
  topicTypeDefs,
  chatTypeDefs,
<<<<<<< HEAD
  otherTypeDefs
=======
  otherTypeDefs,
  internalUserTypeDefs,
  privilegeTypeDef,
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
];

export default typeDefs;
