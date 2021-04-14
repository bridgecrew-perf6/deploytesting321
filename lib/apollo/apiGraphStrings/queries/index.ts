import userQueries from "./user";
import pollQueries from "./poll";
import topicQueries from "./topics";


export default {
    ...userQueries,
    ...pollQueries,
    ...topicQueries
};