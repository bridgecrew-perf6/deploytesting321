import userMutations from "./user";
import pollMutations from "./poll";
import topicMutations from "./topics";
import imgMutations from "./image";
import pollFeedbackMutations from "./pollFeedBack";
import internalUserMutations from "./internalUser";
import privilegeMutations from "./privilegeMutations";

export default {
  ...userMutations,
  ...pollMutations,
  ...topicMutations,
  ...imgMutations,
  ...pollFeedbackMutations,
  ...internalUserMutations,
  ...privilegeMutations,
};
