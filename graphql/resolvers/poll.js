import Poll from "../../models/PollModel";
import User from "../../models/UserModel";
import { transformPoll } from "./shared";

module.exports = {
  Query: {
    polls: async (_, __, ctx) => {
      try {
        const polls = await Poll.find();
        const pollsData = polls.map((poll) => transformPoll(poll));
        return pollsData;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createPoll: async (_, { details }, ctx) => {
      const { isAuth, req, res } = ctx;
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
        const createdPoll = transformPoll(savedPoll);
        const creator = await User.findById(id);

        if (!creator) {
          throw new Error("User not found");
        }
        creator.pollHistory.push(poll);
        await creator.save();
        return createdPoll;
      } catch (err) {
        throw err;
      }
    },
  },
};
