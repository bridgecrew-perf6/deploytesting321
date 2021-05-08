import ISubTopic from "../../models/interfaces/subTopic";
import User from "../../models/UserModel";
import Answer from "../../models/answerModel";
import Poll from "../../models/PollModel";
import Comment from "../../models/commentModel";
import Reply from "../../models/replyModel";
import Topic from "../../models/TopicModel";
import SubTopic from "../../models/SubTopicModel";
import IPoll from "../../models/interfaces/poll";
import IUser from "../../models/interfaces/user";
import ITopic from "../../models/interfaces/topic";
import IAnswer from "../../models/interfaces/answer";
import IComment from "../../models/interfaces/comment";
import IReply from "../../models/interfaces/reply";

const batchUsers: BatchUser = async (ids) => {
  const users: IUser[] = await User.find({ _id: { $in: ids } });
  const userMap: { [key: string]: IUser } = {};

  users.forEach((user) => {
    userMap[user.id] = user;
  });

  return ids.map((id) => userMap[id]);
};

const batchPolls: BatchPolls = async (ids) => {
  const polls = await Poll.find({ _id: { $in: ids } });
  const pollMap: { [key: string]: IPoll } = {};

  polls.forEach((poll) => {
    pollMap[poll.id] = poll;
  });

  return ids.map((id) => pollMap[id]);
};

const batchAnswers: BatchAnswers = async (ids) => {
  const answers = await Answer.find({ _id: { $in: ids } });
  const answerMap: { [key: string]: IAnswer } = {};

  answers.forEach((answer) => {
    answerMap[answer.id] = answer;
  });

  return ids.map((id) => answerMap[id]);
};

const batchComments: BatchComments = async (ids) => {
  const comments = await Comment.find({ _id: { $in: ids } });
  const commentMap: { [key: string]: IComment } = {};

  comments.forEach((comment) => {
    commentMap[comment.id] = comment;
  });

  return ids.map((id) => commentMap[id]);
};

const batchReplies: BatchReplies = async (ids) => {
  const replies = await Reply.find({ _id: { $in: ids } });
  const replyMap: { [key: string]: IReply } = {};

  replies.forEach((reply) => {
    replyMap[reply.id] = reply;
  });

  return ids.map((id) => replyMap[id]);
};

const batchTopics: BatchTopics = async (ids) => {
  const topics = await Topic.find({ _id: { $in: ids } });
  const topicMap: { [key: string]: ITopic } = {};

  topics.forEach((topic) => {
    topicMap[topic.id] = topic;
  });

  return ids.map((id) => topicMap[id]);
};

const batchsubTopics: BatchSubTopics = async (ids) => {
  const subTopics = await SubTopic.find({ _id: { $in: ids } });
  const subTopicMap: { [key: string]: ISubTopic } = {};

  subTopics.forEach((subTopic) => {
    subTopicMap[subTopic.id] = subTopic;
  });

  return ids.map((id) => subTopicMap[id]);
};

export default {
  batchUsers,
  batchPolls,
  batchTopics,
  batchsubTopics,
  batchAnswers,
  batchComments,
  batchReplies
};
