import { Request } from "express";
import { pollLoader, userLoader } from "../../graphql/loaders";

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

interface PollHistory {
  _id: string;
  __typename?: string;
  question: string;
  topic: string;
  creationDate: string;
  creator?: User;
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

interface NavBarProps {
  updateUser: (userData: UserDataProps) => void;
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
  userLoader: ReturnType<typeof userLoader>;
  pollLoader: ReturnType<typeof pollLoader>;
}

interface IHTMLElementForm extends HTMLElement {
  value?: string;
}

interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
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
