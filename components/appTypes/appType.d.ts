<<<<<<< HEAD
=======
import { privilegeMongo } from "./../../models/interfaces/roleInterface";
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
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
<<<<<<< HEAD
} from "../../graphql/loaders";
// import { pubsub } from "../../graphql/middleware/index";

=======
  internalUserLoader,
} from "../../graphql/loaders";
// import { pubsub } from "../../graphql/middleware/index";

// export interface siteTime {
//   hour: number;
//   minutes: number;
//   seconds: number;
// }

>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
interface ErrorMssg {
  message: string;
}

interface NewPollForm {
  question: string;
  topic: string;
}

<<<<<<< HEAD
interface User {
=======
// export interface timeOnPoll {
//   poll: string;
//   time: string;
// }

export interface User {
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
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
<<<<<<< HEAD
=======
  // timeOnSite?: siteTime;
  // timeSpentOnSite: timeOnPoll[];
}

export interface Role {
  role: string;
  description?: string;
  status: string;
  privileges: privilegeMongo;
}

export interface IinternalUser {
  id: string;
  email: string;
  fullName: string;
  jobTitle: string;
  accessRole: Role;
  isActive: boolean;
  password: string;
}

export interface SelectedRow {
  accessRoleId: string;
  _id: string;
  email: string;
  fullName: string;
  jobTitle: string;
  accessRole: string;
  isActive: boolean;
}

export interface exportFile {
  children: string;
  onExport: Function;
}

export interface GetInternalUser {
  getInternalUser: {
    appToken: string;
    internalUser: IinternalUser;
  };
}

export interface validationErrorsAdmin {
  emailErr: string;
  passwordErr: string;
}

export interface adminUserDataForm {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  homeAddress: string;
  jobTitle: string;
  accessRole: {
    value: string;
    _id: string;
  };
  groups: string;
  lastSignIn: string;
  isActive: boolean;
}

export interface masterCatType {
  _id: string;
  active: boolean;
  selected: boolean;
  name: string;
  icon: HTMLElement;
  subCategory: {
    _id: string;
    active: boolean;
    selected: boolean;
    name: string;
    icon: HTMLElement;
  }[];
}

export interface subCatType {
  _id: string;
  active: boolean;
  selected: boolean;
  name: string;
  icon: HTMLElement;
}

export interface adminLeftSidebarType {
  // userId: string;
  data: any;
  loadingChecks: any;
  setLoadingChecks: Function;
  mastercategory: any;
  setmastercategory: Function;
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
}

interface Follower {
  _id: String;
  appId: string;
  profilePic: string | undefined;
}

<<<<<<< HEAD
interface GetAppUser {
  getAppUserData: User;
}

interface MainUser {
=======
export interface GetAppUser {
  getAppUserData: User;
}

export interface MainUser {
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
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

<<<<<<< HEAD
interface UserDataProps {
=======
export interface UserDataProps {
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
  getUserData: {
    appToken: string;
    user: User;
  };
}

<<<<<<< HEAD
=======
export interface InternalUserDataProps {
  getInternalUserData: {
    appToken: string;
    internalUser: any;
  };
}

>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
interface PollsAll {
  polls: PollHistory[] | undefined;
}

interface CookieOptions {
<<<<<<< HEAD
  domain?: string;
  httpOnly: boolean;
  path?: string;
  maxAge: number;
  expires?: Date;
=======
  HttpOnly: boolean;
  domain?: string;
  // httpOnly: boolean;
  path?: string;
  maxAge: number;
  expires?: Date;
  // secure: boolean;
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
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
<<<<<<< HEAD
    | ReturnType<typeof answerLoader>[];
=======
    | ReturnType<typeof answerLoader>[]
    | ReturnType<typeof internalUserLoader>;
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
  pubsub: PubSub;
}

interface IHTMLElementForm extends HTMLElement {
  value?: string;
}

<<<<<<< HEAD
interface ResolverMap {
=======
export interface ResolverMap {
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
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

<<<<<<< HEAD
=======
interface CategoryItems {
  _id: string;
  category: string;
  // creator: string;
  description: string;
  active: boolean;
  linkedCats?: any;
}

>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
interface IProps {
  title: string;
  children?: React.ReactNode;
}

<<<<<<< HEAD
=======
interface NavProps {
  title: string;
}

>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
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

<<<<<<< HEAD
interface CategoryItems {
  _id: string;
  category: string;
  // creator: string;
  description: string;
  active: boolean;
  linkedCats?: any;
=======
interface AdminLeftSideBarCategoryItems {
  _id: string;
  name: string;
  categoryOf: string;
  haveCats: boolean;
  active: boolean;
  selected: boolean;
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
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

<<<<<<< HEAD
=======
interface ChatFeed {
  cursor: string;
  messages: ChatMessage[];
  hasMoreData: boolean;
}

>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
interface SrchCustomBtn extends CustomBtn {
  count: number;
  data: PollHistory[] | Answer[] | ITopic[] | ISubTopic[] | null;
}
<<<<<<< HEAD
=======

interface UserNotification {
  _id: string;
  message: string;
  notificationType: string;
  notificationId: string;
  contentOwner: User;
  user: User;
  creationDate: string;
  read?: boolean;
}
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
