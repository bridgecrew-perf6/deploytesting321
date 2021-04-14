import ISubTopic from "../../models/interfaces/subTopic";
import User from "../../models/UserModel";
import Poll from "../../models/PollModel";
import Topic from "../../models/TopicModel";
import SubTopic from "../../models/SubTopicModel";
import IPoll from "../../models/interfaces/poll";
import IUser from "../../models/interfaces/user";
import ITopic from "../../models/interfaces/topic";

const batchUsers: BatchUser = async (ids) => {
  const users: IUser[] = await User.find({ _id: { $in: ids } });
  const userMap: { [key: string]: IUser } = {};

  users.forEach((user) => {
    userMap[user.id] = user;
  });

  return ids.map((id) => userMap[id]);
};

const batchPolls: BatchPolls = async (ids) => {
  console.log(ids)
  const polls = await Poll.find({ _id: { $in: ids } });
  const pollMap: { [key: string]: IPoll } = {};

  polls.forEach((poll) => {
    pollMap[poll.id] = poll;
  });

  return ids.map((id) => pollMap[id]);
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

export default { batchUsers, batchPolls, batchTopics, batchsubTopics };
