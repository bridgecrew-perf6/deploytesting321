import { ResolverMap } from "../../components/appTypes/appType";
import Poll from "../../models/PollModel";
import User from "../../models/UserModel";
import { transformPoll } from "./shared";

export const pollResolvers: ResolverMap = {
  Query: {
    polls: async (_, __, { userLoader }) => {
      try {
        const polls = await Poll.find();
        const pollsData = polls.map((poll) => transformPoll(poll, userLoader));
        return pollsData;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createPoll: async (_, { details }, ctx) => {
      const { isAuth, req, res, userLoader } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      const detailObj = JSON.parse(details);

      const poll = new Poll({
        ...detailObj,
        subTopic: "",
        creator: id,
      });

      let existingPoll;

      try {
        existingPoll = await Poll.findOne({ question: detailObj.question });
        if (existingPoll) {
          throw new Error(
            "Question already exists.  Please create a different question."
          );
        }

        const savedPoll = await poll.save();
        const createdPoll = transformPoll(savedPoll, userLoader);
        const creator = await User.findById(id);

        if (!creator) {
          throw new Error("User not found");
        }

        if (creator.pollHistory) {
          creator.pollHistory.push(poll._id);
        } else creator.pollHistory = [poll._id];

        await creator.save();
        return createdPoll;
      } catch (err) {
        throw err;
      }
    },
  },
};
