import userMutations from "./user";
import pollMutations from "./poll";
import topicMutations from "./topics";
<<<<<<< HEAD
import imgMutations from "./image";
import pollFeedbackMutations from "./pollFeedBack";
=======
import otherMutations from "./other";
import imgMutations from "./image";
import pollFeedbackMutations from "./pollFeedBack";
import internalUserMutations from "./internalUser";
import privilegeMutations from "./privilegeMutations";
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5

export default {
  ...userMutations,
  ...pollMutations,
  ...topicMutations,
  ...imgMutations,
<<<<<<< HEAD
  ...pollFeedbackMutations,
=======
  ...otherMutations,
  ...pollFeedbackMutations,
  ...internalUserMutations,
  ...privilegeMutations,
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
};
