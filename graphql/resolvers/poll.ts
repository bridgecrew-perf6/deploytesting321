import { ResolverMap, PollHistory } from "../../components/appTypes/appType";
import Chat from "../../models/chatModel";
import IChat from "../../models/interfaces/chat";
import IPoll from "../../models/interfaces/poll";
import IUser from "../../models/interfaces/user";
import Poll from "../../models/PollModel";
import Answer from "../../models/answerModel";
import User from "../../models/UserModel";
import { transformPoll } from "./shared";
import loaders from "../loaders/dataLoaders";
import IAnswer from "../../models/interfaces/answer";
import { Types } from "mongoose";

const { batchPolls } = loaders;

export const pollResolvers: ResolverMap = {
  Query: {
    polls: async (_, __, { dataLoaders }) => {
      try {
        const polls = await Poll.find();
        const pollsData = polls.map((poll) =>
          transformPoll(
            poll,
            dataLoaders(["user", "topic", "subTopic", "answer", "chat"])
          )
        );

        return pollsData;
      } catch (err) {
        throw err;
      }
    },
    poll: async (_, { pollId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;

      try {
        const pollFound = await Poll.findById(pollId);
        const fullPoll = transformPoll(
          pollFound,
          dataLoaders(["user", "topic", "subTopic", "answer", "chat"])
        );

        return fullPoll;
      } catch (err) {
        throw err;
      }
    },
    showViews: async (_, { pollId }, ctx) => {
      try {
        const poll: IPoll = await Poll.findById(pollId);
        return poll.views;
      } catch (err) {
        throw err;
      }
    },
    pollsByUser: async (_, { userId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      try {
        let userPolls;

        if (userId) {
          userPolls = await Poll.find({ creator: userId });
        } else {
          userPolls = await Poll.find({ creator: id });
        }

        if (userPolls.length === 0) {
          throw new Error(
            "No Polls Found.  Use the New Poll feature to add polls about topics and subtopics that interest you.  You can see all your created polls here."
          );
        }

        return userPolls.map((poll) =>
          transformPoll(
            poll,
            dataLoaders(["user", "topic", "subTopic", "answer", "chat"])
          )
        );
      } catch (err) {
        throw err;
      }
    },
    pollsByTopic: async (_, { topic }, { dataLoaders }) => {
      try {
        let polls: IPoll[];

        if (topic !== "All_1") {
          polls = await Poll.find({ topic });
        } else {
          polls = await Poll.find();
        }

        return polls.map((poll) =>
          transformPoll(
            poll,
            dataLoaders(["user", "topic", "subTopic", "answer", "chat"])
          )
        );
      } catch (err) {
        throw err;
      }
    },

    pollsBySubTopic: async (_, { subTopic }, { dataLoaders }) => {
      try {
        let polls: IPoll[];

        if (subTopic !== "All_1") {
          polls = await Poll.find({
            subTopics: Types.ObjectId(subTopic),
          });
        } else {
          polls = await Poll.find();
        }

        return polls.map((poll) =>
          transformPoll(
            poll,
            dataLoaders(["user", "topic", "subTopic", "answer", "chat"])
          )
        );
      } catch (err) {
        throw err;
      }
    },

    trendingPolls: async (_, args, { dataLoaders }) => {
      try {
        const answers: IAnswer[] = await Answer.find();

        const answersWithTrendCount: { pollId: string; trendCount: number }[] =
          [];

        for (let i = 0; i < answers.length; i++) {
          const answer = answers[i];
          const likesCount = answer.likes ? answer.likes.length : 0;
          const dislikeCount = answer.dislikes ? answer.dislikes.length : 0;

          const answerMatchIdx = answersWithTrendCount.findIndex(
            (item) => String(item.pollId) === String(answer.poll)
          );

          if (answerMatchIdx === -1) {
            answersWithTrendCount.push({
              pollId: answer.poll,
              trendCount: likesCount + dislikeCount,
            });
          } else {
            const { pollId, trendCount } =
              answersWithTrendCount[answerMatchIdx];
            answersWithTrendCount[answerMatchIdx] = {
              pollId,
              trendCount: trendCount + likesCount + dislikeCount,
            };
          }
        }

        const polls = await Poll.find();

        const pollsWithTrendCounts = polls.map((item) => {
          const matchIdx = answersWithTrendCount.findIndex((answer) =>
            String(answer.pollId === String(item._id))
          );

          const totalAnswerCount = item.answers ? item.answers.length : 0;

          const totalTrendCount =
            totalAnswerCount + answersWithTrendCount[matchIdx].trendCount;

          return { item, totalTrendCount };
        });

        const dataSorted = pollsWithTrendCounts.sort(
          (a, b) => b.totalTrendCount - a.totalTrendCount
        );

        return dataSorted.map((item) => {
          return transformPoll(
            item.item,
            dataLoaders(["user", "topic", "subTopic", "answer", "chat"])
          );
        });
      } catch (err) {
        throw err;
      }
    },
    activeChats: async (_, args, { dataLoaders }) => {
      try {
        const chats: IChat[] = await Chat.find();

        const chatsInTimeOrder = chats.sort(
          (a: any, b: any) => b.creationDate - a.creationDate
        );

        const pollIds = chatsInTimeOrder.map((item) => String(item.poll));
        const uniquePolls = pollIds.filter(
          (val, idx) => pollIds.indexOf(val) === idx
        );

        const activeChatPolls = await batchPolls(uniquePolls);

        const activeChatPollsSorted = activeChatPolls.sort(
          (a, b) => b.chatMssgs.length - a.chatMssgs.length
        );

        return activeChatPollsSorted.map((item) =>
          transformPoll(
            item,
            dataLoaders(["user", "topic", "subTopic", "answer", "chat"])
          )
        );
      } catch (err) {
        throw err;
      }
    },
    newestPolls: async (_, args, { dataLoaders }) => {
      try {
        const polls: IPoll[] = await Poll.find();
        const sortedPollData = polls.sort(
          (a: any, b: any) => b.creationDate - a.creationDate
        );

        return sortedPollData.map((poll) =>
          transformPoll(
            poll,
            dataLoaders(["user", "topic", "subTopic", "answer", "chat"])
          )
        );
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createPoll: async (_, { details }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      const detailObj = JSON.parse(details);

      const poll = new Poll({
        ...detailObj,
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
        const createdPoll = transformPoll(
          savedPoll,
          dataLoaders(["user", "topic", "subTopic", "answer", "chat"])
        );

        const creator = await User.findById(id);

        if (!creator) {
          throw new Error("User not found");
        }

        if (creator.pollHistory) {
          creator.pollHistory.push(poll._id);
        } else creator.pollHistory = [poll._id];

        if (creator.following && creator.following.length > 0) {
        


        }

        await creator.save();

        return createdPoll;
      } catch (err) {
        throw err;
      }
    },
    addView: async (_, { pollId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      try {
        const poll: IPoll = await Poll.findById(pollId);

        poll.views += 1;

        await poll.save();
        return poll.views;
      } catch (err) {
        throw err;
      }
    },
  },
  // Subscription: {
  //   newNotification: {
  //     subscribe: (parent, args, { pubsub }) =>
  //       pubsub.asyncIterator("newNotification"),
  //   },
  // },
};
