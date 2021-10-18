import {
  ResolverMap,
  UserNotification,
} from "../../components/appTypes/appType";
import Answer from "../../models/answerModel";
import IPoll from "../../models/interfaces/poll";
import Poll from "../../models/PollModel";
import Notification from "../../models/notificationModel";
import User from "../../models/UserModel";
import {
  transformAnswer,
  transformNotification,
  transformPoll,
} from "./shared";
import batchLoaders from "../loaders/dataLoaders";
import IAnswer from "../../models/interfaces/answer";
import { getNumRanking } from "./shared/metrics";
import IUser from "../../models/interfaces/user";
import mongoose from "mongoose";
import INotification from "../../models/interfaces/notification";
import { showAbbreviatedTxt } from "../../components/globalFuncs";

const { batchAnswers } = batchLoaders;

export const feedBackResolvers: ResolverMap = {
  Query: {
    answersByPoll: async (parent, { pollId }, { dataLoaders }) => {
      try {
        const answers: IAnswer[] = await Answer.find({ poll: pollId });

        const answerData = answers.map((answer) =>
          transformAnswer(answer, dataLoaders(["user", "poll"]))
        );

        return answerData;
        // return getNumRanking(answerData);
      } catch (err) {
        throw err;
      }
    },
    notifications: async (parent, args, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      try {
        const notifications = await Notification.find({
          contentOwner: id,
        });
        return notifications.map((item) =>
          transformNotification(item, dataLoaders(["user"]))
        );
      } catch (err) {
        throw err;
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

        //Push to Notification
        if (pollItem.creator.toString() !== id) {
          const creator = await User.findById(id);

          const notification = new Notification({
            message: `${
              creator.appid
            } added an answer to the poll: ${showAbbreviatedTxt(
              pollItem.question
            )}`,
            user: id,
            notificationType: "poll",
            notificationId: pollItem._id,
            contentOwner: pollItem.creator.toString(),
            read: false,
          });

          const savedNotification = await notification.save();

          const newNotification = transformNotification(
            savedNotification,
            dataLoaders(["user"])
          );

          pubsub.publish("newNotification", { newNotification });
        }

        return createdAnswer;
      } catch (err) {
        throw err;
      }
    },
    updateNotification: async (parent, { details }, ctx) => {
      const { isAuth, req, res, pubsub, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      const updatedIds = JSON.parse(details);
      // const detailObjList: UserNotification[] = JSON.parse(details);
      // const updatedIds = detailObjList.map((item) => item._id);

      try {
        const notifications = await Notification.updateMany(
          //query
          { _id: { $in: updatedIds } },
          //update
          { $set: { read: true } }
        );
      } catch (err) {
        throw err;
      }
    },
    handleLikeDislike: async (
      parent,
      { feedback, feedbackVal, answerId, pollId },
      ctx
    ) => {
      const { isAuth, req, res, pubsub, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      let answerWithFeedback;

      try {
        if (feedback === "like" && id) {
          const existingLike = await Answer.find({
            _id: answerId,
            "likes.userId": id,
          });

          if (existingLike.length > 0) {
            answerWithFeedback = await Answer.updateOne(
              {
                _id: answerId,
              },
              {
                $pull: { likes: { userId: id, like: true } } as any,
              }
            );
          }

          if (existingLike.length === 0) {
            answerWithFeedback = await Answer.updateOne(
              {
                _id: answerId,
              },
              {
                $push: { likes: { userId: id, like: true } } as any,
                $pull: { dislikes: { userId: id, dislike: true } } as any,
              }
            );
          }
        }

        if (feedback === "dislike") {
          const existingDisLike = await Answer.find({
            _id: answerId,
            "dislikes.userId": id,
          });

          if (existingDisLike.length > 0) {
            answerWithFeedback = await Answer.updateOne(
              {
                _id: answerId,
              },
              {
                $pull: { dislikes: { userId: id, dislike: true } } as any,
              }
            );
          }

          if (existingDisLike.length === 0) {
            answerWithFeedback = await Answer.updateOne(
              {
                _id: answerId,
              },
              {
                $push: { dislikes: { userId: id, dislike: true } } as any,
                $pull: { likes: { userId: id, like: true } } as any,
              }
            );
          }
        }

        const updatedAnswers = await Answer.find({
          poll: pollId,
        });

        const rankedAnswers = getNumRanking(updatedAnswers);

        rankedAnswers.forEach(async (item) => {
          await Answer.updateOne(
            { _id: item._doc._id },
            {
              $set: { rank: String(item._doc.rank) },
            }
          );

          pubsub.publish("newAnswer", {
            newAnswer: transformAnswer(
              item as IAnswer,
              dataLoaders(["user", "poll", "comment"])
            ),
          });
        });
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
    newNotification: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator("newNotification"),
    },
  },
};
