import { ResolverMap } from "../../components/appTypes/appType";
import Answer from "../../models/answerModel";
import IPoll from "../../models/interfaces/poll";
import Poll from "../../models/PollModel";
// import User from "../../models/UserModel";
import { transformAnswer, transformPoll } from "./shared";
import batchLoaders from "../loaders/dataLoaders";
import IAnswer from "../../models/interfaces/answer";

const { batchAnswers } = batchLoaders;

export const feedBackResolvers: ResolverMap = {
  Query: {
    answersByPoll: async (parent, { pollId }, { dataLoaders }) => {
      try {
        const answers = await Answer.find({ poll: pollId });

        const answerData = answers.map((answer) =>
          transformAnswer(answer, dataLoaders(["user", "poll", "comment"]))
        );

        return answerData;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createAnswer: async (parent, { details }, ctx) => {
      const { isAuth, req, res, pubsub, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      const detailObj = JSON.parse(details);

      const pollAnswer = new Answer({
        ...detailObj,
        creator: id,
      });

      try {
        const pollItem: IPoll = await Poll.findById(detailObj.poll);

        if (!pollItem) {
          throw new Error("Poll Not found");
        }

        const answerData: IAnswer[] = await batchAnswers(pollItem.answers);

        const answerMatch = answerData.some(
          (item) => item.answer === detailObj.answer
        );

        if (answerMatch) {
          throw new Error(
            "This answer already exists.  Please comment on the existing answer or create a new one."
          );
        }

        const savedAnswer = await pollAnswer.save();
        const createdAnswer = transformAnswer(
          savedAnswer,
          dataLoaders(["user", "poll"])
        );

        pollItem.answers.push(pollAnswer._id);

        await pollItem.save();

        pubsub.publish("newAnswer", { newAnswer: createdAnswer });

        return createdAnswer;
      } catch (err) {
        throw err;
      }
    },

    //Recode - Too verbose - Can be a lot shorter code wise
    handleLikeDislike: async (
      parent,
      { feedback, feedbackVal, answerId },
      ctx
    ) => {
      const { isAuth, req, res, pubsub, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      try {
        const answer: IAnswer = await Answer.findById(answerId);

        if (!answer) {
          throw new Error("Answer Not found");
        }

        const existingLike = answer.likes.some((item) => item.userId === id);
        const existingDisLike = answer.dislikes.some(
          (item) => item.userId === id
        );

        if (existingLike && feedback === "dislike" && id) {
          answer.likes = answer.likes.filter((item) => item.userId !== id);
          answer.dislikes.push({ userId: id, dislike: feedbackVal });
        }

        if (existingDisLike && feedback === "like" && id) {
          answer.dislikes = answer.dislikes.filter(
            (item) => item.userId !== id
          );
          answer.likes.push({ userId: id, like: feedbackVal });
        }

        if (!existingLike && !existingDisLike && feedback === "like" && id) {
          answer.likes.push({ userId: id, like: feedbackVal });
        }

        if (!existingLike && !existingDisLike && feedback === "dislike" && id) {
          answer.dislikes.push({ userId: id, dislike: feedbackVal });
        }

        if (
          (existingLike && feedback === "like") ||
          (existingDisLike && feedback === "dislike")
        ) {
          answer.likes = answer.likes.filter((item) => item.userId !== id);
          answer.dislikes = answer.dislikes.filter(
            (item) => item.userId !== id
          );
        }

        const savedAnswer = await answer.save();
        const createdAnswer = transformAnswer(
          savedAnswer,
          dataLoaders(["user", "poll"])
        );

        pubsub.publish("newAnswer", { newAnswer: createdAnswer });

        return "done";
      } catch (err) {
        throw err;
      }
    },
  },
  Subscription: {
    newAnswer: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator("newAnswer"),
    },
  },
};
