import { Request } from "express";
import { PubSub } from "graphql-subscriptions";
import {
  pollLoader,
  userLoader,
  topicLoader,
  subTopicLoader,
  answerLoader,
  commentLoader,
  replyLoader,
} from "../../graphql/loaders";
// import { pubsub } from "../../graphql/middleware/index";

interface ErrorMssg {
  message: string;
}

interface NewPollForm {
  question: string;
  topic: string;
}

interface User {
  _id: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  appid: string;
  email?: string;
  profilePic?: string;
  registerDate?: Date;
  pollHistory?: PollHistory[];
}

interface Reply {
  _id: string;
  __typename?: string;
  reply: string;
  comment: Comment;
  creator?: User;
  replyImages: string[];
  creationDate: string;
}

interface Comment {
  _id: string;
  __typename?: string;
  comment: string;
  answer: Answer;
  creator?: User;
  commentImages: string[];
  replies?: Reply[];
  creationDate: string;
}

interface Answer {
  _id: string;
  __typename?: string;
  answer: string;
  poll: PollHistory;
  comments?: Comment[];
  creator?: User;
  answerImages?: string[];
  creationDate: string;
}

interface PollHistory {
  _id: string;
  __typename?: string;
  question: string;
  topic: Topic;
  subTopics: SubTopic[];
  creationDate: string;
  creator?: User;
  answers: Answer[];
  pollImages: string[];
}

interface UserDataProps {
  getUserData: {
    appToken: string;
    user: User;
  };
}

interface PollsAll {
  polls: PollHistory[] | undefined;
}

interface CookieOptions {
  domain?: string;
  httpOnly: boolean;
  path?: string;
  maxAge: number;
  expires?: Date;
}

declare module "express" {
  interface ResponseCustom {
    setHeader: () => void;
    cookie: (name: string, value: string, options: CookieOptions) => void;
  }
}

declare module "express" {
  interface Request {
    headers?: {
      cookie?: string;
    };
  }
}

interface ApolloSeverContext {
  req: Request;
  res: ResponseCustom;
  isAuth: {
    auth: boolean;
    id: string | null | undefined;
  };
  dataLoaders:
    | ReturnType<typeof userLoader>
    | ReturnType<typeof pollLoader>[]
    | ReturnType<typeof topicLoader>
    | ReturnType<typeof subTopicLoader>[]
    | ReturnType<typeof commentLoader>[]
    | ReturnType<typeof replyLoader>[]
    | ReturnType<typeof answerLoader>[];
  pubsub: PubSub;
}

interface IHTMLElementForm extends HTMLElement {
  value?: string;
}

interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver | SubscriptionResolver;
  };
}

interface SubscriptionResolver {
  [key: string]: Resolver;
}

type Resolver = (
  parent: any,
  args: any,
  context: ApolloSeverContext,
  info: any
) => any;

interface StatesUS {
  id: string;
  name: string;
}

enum MsgTyp {
  Error,
  AppMsg,
}

interface AppMssg {
  msgType?: MsgTyp;
  message?: string;
}

interface IProps {
  title: string;
  children?: React.ReactNode;
}

interface ITopic {
  _id: string;
  topic: string;
  description: string;
  creator: User;
  subTopics?: ISubTopic[];
}

interface ISubTopic {
  _id: string;
  subTopic: string;
  description: string;
  topic: ITopic;
  creator: User;
}

interface SelectedTopic {
  id: string;
  topic: string;
}

interface SelectedSubTopic {
  id: string;
  subTopic: string;
  new?: boolean;
}

interface SelectedImage {
  userId?: string;
  id?: string;
  image: string | Blob;
  imageUri?: string;
  imageName: string;
  imgType?: string;
}

interface IPollChatBox {
  pollId: string;
  appUser?: User | null;
  data?: ChatMessage[];
  userList?: User[];
  currentUsers?: User[];
  updateUsers?: (userList: User[]) => void;
}

interface ChatMessage {
  _id: string;
  message: string;
  creator: User;
  poll: PollHistory;
  creationDate: string;
  chatImages?: string[];
}
