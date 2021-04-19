import userMutations from "./user";
import pollMutations from "./poll";
import topicMutations from "./topics";
import imgMutations from "./image";

export default {
  ...userMutations,
  ...pollMutations,
  ...topicMutations,
  ...imgMutations,
};
