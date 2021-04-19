import userQueries from "./user";
import pollQueries from "./poll";
import topicQueries from "./topics";
import imgQueries from "./image";

export default {
  ...userQueries,
  ...pollQueries,
  ...topicQueries,
  ...imgQueries,
};
