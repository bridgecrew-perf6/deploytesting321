import { Request } from "express";
import { PubSub } from "graphql-subscriptions";
import {
  pollLoader,
  userLoader,
  topicLoader,
  subTopicLoader,
  answerLoader,
  chatLoader,
  replyLoader,
  internalUserLoader,
} from "../../graphql/loaders";
// import { pubsub } from "../../graphql/middleware/index";

interface ErrorMssg {
  message: string;
}

interface NewPollForm {
  question: string;
  topic: string;
}

export interface User {
  _id: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  address1?: string;
  address2?: string;
  isAppUser?: boolean;
  bio?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  appid: string;
  email?: string;
  following?: Follower[];
  profilePic?: string;
  registerDate?: Date;
  pollHistory?: PollHistory[];
}

export interface IinternalUser {
  id: string;
  email: string;
  fullName: string;
  jobTitle: string;
  accessRole: { admin: String; employee: String; moderator: String };
  isActive: boolean;
  password: string;
}

export interface GetInternalUser {
  getInternalUser: {
    appToken: string;
    internalUser: IinternalUser;
  };
}

interface Follower {
  _id: String;
  appId: string;
  profilePic: string | undefined;
}

export interface GetAppUser {
  getAppUserData: User;
}

export interface MainUser {
  getUserData: {
    appToken: string;
    user: User;
  };
}

// interface Reply {
//   _id: string;
//   __typename?: string;
//   reply: string;
//   comment: Comment;
//   creator?: User;
//   replyImages: string[];
//   creationDate: string;
// }

// interface Comment {
//   _id: string;
//   __typename?: string;
//   comment: string;
//   answer: Answer;
//   creator?: User;
//   commentImages: string[];
//   replies?: Reply[];
//   creationDate: string;
// }

interface Answer {
  _id: string;
  __typename?: string;
  answer: string;
  poll: PollHistory;
  comments?: Comment[];
  creator?: User;
  answerImages?: string[];
  creationDate: string;
  likes: { userId: string; like: boolean }[];
  dislikes: { userId: string; dislike: boolean }[];
  rank?: string | number;
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
  views?: number;
  chatMssgs?: ChatMessage[];
}

export interface UserDataProps {
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
    | ReturnType<typeof chatLoader>[]
    | ReturnType<typeof replyLoader>[]
    | ReturnType<typeof answerLoader>[]
    | ReturnType<typeof internalUserLoader>;
  pubsub: PubSub;
}

interface IHTMLElementForm extends HTMLElement {
  value?: string;
}

export interface ResolverMap {
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

interface NavProps {
  title: string;
}

interface ITopic {
  _id: string;
  topic: string;
  description: string;
  creator: User;
  subTopics?: ISubTopic[];
  active?: Boolean;
  pollCount?: number;
}

interface ISubTopic {
  _id: string;
  subTopic: string;
  description: string;
  topic: ITopic;
  creator: User;
  active?: Boolean;
  pollCount?: number;
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
  pollUsers?: User[];
  data?: ChatMessage[];
  userList?: User[];
  currentUsers?: User[];
  updateUsers?: (userList: User[]) => void;
  addAnswer?: (answer: string, aswerImgs: SelectedImage[]) => void;
  addError?: (errMssg?: string) => void;
  showSection?: boolean;
  user?: User | null;
}

interface ChatMessage {
  _id: string;
  message: string;
  creator: User;
  poll: PollHistory;
  creationDate: string;
  chatImages?: string[];
}

interface SliderSettings {
  className?: string;
  centerMode?: boolean;
  infinite: boolean;
  centerPadding?: string;
  slidesToShow: number;
  slidesPerRow?: number;
  speed: number;
  rows?: number;
  slidesToShow: number;
  slidesToScroll?: number;
  dots?: boolean;
  arrows?: boolean;
  nextArrow?: JSX.Element;
  prevArrow?: JSX.Element;
  dotsClass?: string;
  customPaging?: (i: number) => JSX.Element;
  appendDots?: (vals: object[]) => JSX.Element;
}

interface ProfileType {
  type: string;
  active: boolean;
  loading: boolean;
  numCount?: number;
  data: PollHistory[] | UserFavorites;
  error?: string;
}

interface SearchResults {
  question: { count: number; question: PollHistory[] };
  answer: { count: number; answer: Answer[] };
  topic: { count: number; topic: ITopic[] };
  subTopic: { count: number; topic: ISubTopic[] };
}

interface UserFavorites {
  favoritePolls: PollHistory[];
  favoriteAnswers: Answer[];
}

interface AdminLeftSideBarCategoryItems {
  _id: string;
  name: string;
  categoryOf: string;
  haveCats: boolean;
  active: boolean;
  selected: boolean;
}

interface PollsWindow {
  data: CategoryItems[];
  loading?: boolean;
  search?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // loadPolls: (catType: string, catId: string) => void;
  select: (activeId: string, catType: string, topic?: string) => void;
}

interface CustomBtn {
  active: boolean;
  btnName: string;
  data: any[];
}

interface SrchCustomBtn extends CustomBtn {
  count: number;
  data: PollHistory[] | Answer[] | ITopic[] | ISubTopic[] | null;
}
