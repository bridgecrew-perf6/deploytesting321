import DataLoader from "dataloader";
import IPoll from "../../models/interfaces/poll";
import IUser from "../../models/interfaces/user";
import User from "../../models/UserModel";
import Poll from "../../models/PollModel";

type BatchUser = (ids: readonly string[]) => Promise<IUser[]>;
type BatchPolls = (ids: readonly string[]) => Promise<IPoll[]>;

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

export const userLoader = () => new DataLoader<string, IUser>(batchUsers);

export const pollLoader = () => new DataLoader<string, IPoll>(batchPolls);
