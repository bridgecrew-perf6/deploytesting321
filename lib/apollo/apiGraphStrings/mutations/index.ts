import userMutations from "./user";
import pollMutations from "./poll";
import topicMutations from "./topics";


export default {
    ...userMutations,
    ...pollMutations,
    ...topicMutations
};