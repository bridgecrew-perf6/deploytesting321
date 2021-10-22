import userQueries from "./user";
import pollQueries from "./poll";
import otherQueries from "./other";
import topicQueries from "./topics";
import pollFeedBackQueries from "./pollFeedback";
<<<<<<< HEAD
=======
import internalUserQueries from "./internalUser";
import privilegeQueries from "./privilegesQueries";
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5

export default {
  ...userQueries,
  ...pollQueries,
  ...topicQueries,
  ...pollFeedBackQueries,
  ...otherQueries,
<<<<<<< HEAD
=======
  ...internalUserQueries,
  ...privilegeQueries,
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
};
