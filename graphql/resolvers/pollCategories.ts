import { ResolverMap } from "../../components/appTypes/appType";
import Topic from "../../models/TopicModel";
import SubTopic from "../../models/SubTopicModel";
import { transformSubTopic, transformTopic } from "./shared";
import ITopic from "../../models/interfaces/topic";
import ISubTopic from "../../models/interfaces/subTopic";
import batchLoaders from "../loaders/dataLoaders";
import { getAlphabeticalList } from "../../components/globalFuncs";

export const topicResolvers: ResolverMap = {
  Query: {
    topics: async (parent, args, { dataLoaders }) => {
      try {
        const topics = await Topic.find();
        const topicsWithData = topics.map((topic) =>
          transformTopic(topic, dataLoaders(["user", "subTopic"]))
        );

        return getAlphabeticalList(topicsWithData, "topic");
      } catch (err) {
        throw err;
      }
    },
    subTopics: async (parent, args, { dataLoaders }) => {
      try {
        const subTopics = await SubTopic.find();
        const subTopicsWithData = subTopics.map((subTopic) =>
          transformSubTopic(subTopic, dataLoaders(["user", "topic", "poll"]))
        );

        return getAlphabeticalList(subTopicsWithData, "subTopic");
      } catch (err) {
        throw err;
      }
    },
    subTopicsPerTopic: async (parent, { topic }, { dataLoaders }) => {
      const { batchsubTopics } = batchLoaders;

      try {
        const selectedTopic = await Topic.findOne({ topic });

        if (!selectedTopic) {
          const subTopics = await SubTopic.find();
          const subTopicData = subTopics.map((subTopic) =>
            transformSubTopic(subTopic, dataLoaders(["user", "topic", "poll"]))
          );

          return getAlphabeticalList(subTopicData, "subTopic");
        }

        const subTopicList = await batchsubTopics(selectedTopic.subTopics);

        const subTopicListData = subTopicList.map((subTopic) =>
          transformSubTopic(subTopic, dataLoaders(["user", "topic", "poll"]))
        );

        return getAlphabeticalList(subTopicListData, "subTopic");
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createTopic: async (parent, { topicInfo }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      const topicObj = JSON.parse(topicInfo);

      const newTopic: ITopic = new Topic({
        ...topicObj,
        subTopics: [],
        creator: id,
      });

      let existingTopic;

      try {
        existingTopic = await Topic.findOne({ topic: topicObj.topic });
        if (existingTopic) {
          throw new Error(
            "Topic already exists.  Please create a different topic."
          );
        }

        const savedTopic = await newTopic.save();
        const createdTopic = transformTopic(
          savedTopic,
          dataLoaders(["user", "subTopic"])
        );

        return createdTopic;
      } catch (err) {
        throw err;
      }
    },
    createSubTopic: async (parent, { subTopicInfo }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      const subTopicObj = JSON.parse(subTopicInfo);

      const newSubTopic: ISubTopic = new SubTopic({
        ...subTopicObj,
        creator: id,
        polls: [],
      });

      let existingSubTopic;

      const regExpString = new RegExp(subTopicObj.subTopic, "i"); //case insenstive search for value in DB

      try {
        existingSubTopic = await SubTopic.findOne({
          subTopic: regExpString,
        });

        if (existingSubTopic) {
          throw new Error(
            "SubTopic already exists.  Please create a different subtopic."
          );
        }

        const existingTopic = await Topic.findById(subTopicObj.topic);

        if (!existingTopic) {
          throw new Error("Topic not found");
        }

        const savedSubTopic = await newSubTopic.save();

        const createdSubTopic = transformSubTopic(
          savedSubTopic,
          dataLoaders(["user", "topic", "poll"])
        );

        if (existingTopic.subTopics) {
          existingTopic.subTopics.push(newSubTopic._id);
        } else {
          existingTopic.subTopics = [newSubTopic._id];
        }

        await existingTopic.save();
        return createdSubTopic;
      } catch (err) {
        throw err;
      }
    },
  },
};
