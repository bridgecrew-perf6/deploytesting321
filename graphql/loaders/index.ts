import DataLoader from "dataloader";
import IPoll from "../../models/interfaces/poll";
import IUser from "../../models/interfaces/user";
import ITopic from "../../models/interfaces/topic";
import batchLoaders from "./dataLoaders";
import ISubTopic from "../../models/interfaces/subTopic";
import IAnswer from "../../models/interfaces/answer";
import IReply from "../../models/interfaces/reply";
import IChat from "../../models/interfaces/chat";
<<<<<<< HEAD
=======
import INotification from "../../models/interfaces/notification";
import IinternalUsers from "../../models/interfaces/internalUser";
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5

const getLoaderByDataType = (dataType: string) => {
  let loader: any;

  const {
    batchUsers,
<<<<<<< HEAD
=======
    batchNotifications,
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
    batchPolls,
    batchTopics,
    batchsubTopics,
    batchAnswers,
    batchChats,
<<<<<<< HEAD
=======
    batchInternalUsers,
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
    // batchReplies,
  } = batchLoaders;

  switch (true) {
    case dataType == "user":
      loader = new DataLoader<string, IUser>(batchUsers);
      break;
<<<<<<< HEAD
=======
      case dataType == "notification":
        loader = new DataLoader<string, INotification>(batchNotifications);
        break;
    case dataType == "internalUser":
      loader = new DataLoader<string, IinternalUsers>(batchInternalUsers);
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
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
    case dataType == "chat":
      loader = new DataLoader<string, IChat>(batchChats);
      break;
    // case dataType == "reply":
    //   loader = new DataLoader<string, IReply>(batchReplies);
    //   break;
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
