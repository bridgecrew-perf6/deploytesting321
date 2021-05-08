import DataLoader from "dataloader";
import IPoll from "../../models/interfaces/poll";
import IUser from "../../models/interfaces/user";
import ITopic from "../../models/interfaces/topic";
import batchLoaders from "./dataLoaders";
import ISubTopic from "../../models/interfaces/subTopic";
import IAnswer from "../../models/interfaces/answer";
import IReply from "../../models/interfaces/reply";

const getLoaderByDataType = (dataType: string) => {
  let loader: any;

  const {
    batchUsers,
    batchPolls,
    batchTopics,
    batchsubTopics,
    batchAnswers,
    batchComments,
    batchReplies,
  } = batchLoaders;

  switch (true) {
    case dataType == "user":
      loader = new DataLoader<string, IUser>(batchUsers);
      break;
    case dataType == "poll":
      loader = new DataLoader<string, IPoll>(batchPolls);
      break;
    case dataType == "topic":
      loader = new DataLoader<string, ITopic>(batchTopics);
      break;
    case dataType == "subTopic":
      loader = new DataLoader<string, ISubTopic>(batchsubTopics);
      break;
    case dataType == "answer":
      loader = new DataLoader<string, IAnswer>(batchAnswers);
      break;
    case dataType == "comment":
      loader = new DataLoader<string, IAnswer>(batchComments);
      break;
    case dataType == "reply":
      loader = new DataLoader<string, IReply>(batchReplies);
      break;
  }

  return loader;
};

const dataLoaders = (loaderTypes: string[]) => {
  return loaderTypes.map((item) => {
    return {
      loaderType: item == "user" ? "creator" : item,
      loader: getLoaderByDataType(item),
    };
  });
};

export default dataLoaders;
