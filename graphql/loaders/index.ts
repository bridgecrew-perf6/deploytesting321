import DataLoader from "dataloader";
import IPoll from "../../models/interfaces/poll";
import IUser from "../../models/interfaces/user";
import ITopic from "../../models/interfaces/topic";
import batchLoaders from "./dataLoaders";
import ISubTopic from "../../models/interfaces/subTopic";
import Iimage from "../../models/interfaces/image";

const getLoaderByDataType = (dataType: string) => {
  let loader: any;

  const {
    batchUsers,
    batchPolls,
    batchTopics,
    batchsubTopics,
    batchImgs,
  } = batchLoaders;

  switch (true) {
    case dataType == "user":
      loader = new DataLoader<string, IUser>(batchUsers);
      break;
    case dataType == "poll":
      loader = new DataLoader<string, IPoll>(batchPolls);
      break;
    case dataType == "image":
      loader = new DataLoader<string, Iimage>(batchImgs);
      break;
    case dataType == "topic":
      loader = new DataLoader<string, ITopic>(batchTopics);
      break;
    case dataType == "subTopic":
      loader = new DataLoader<string, ISubTopic>(batchsubTopics);
      break;
    default:
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
