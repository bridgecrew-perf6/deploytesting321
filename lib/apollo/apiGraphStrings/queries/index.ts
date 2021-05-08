import userQueries from "./user";
import pollQueries from "./poll";
import topicQueries from "./topics";
import pollFeedBackQueries from "./pollFeedback";

export default {
  ...userQueries,
  ...pollQueries,
  ...topicQueries,
  ...pollFeedBackQueries
};
