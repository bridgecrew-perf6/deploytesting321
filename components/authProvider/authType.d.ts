// interface AuthState {
//   token?: string;
//   userId?: string;
//   userData?: String;
// }

<<<<<<< HEAD
interface AppContextInterface {
=======
import { InternalUserDataProps } from "_components/appTypes/appType";

export interface AppContextInterface {
  internalUserAuthState: InternalUserDataProps;
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
  authState: UserDataProps;
  appMssgs: AppMssg[];
  searchVal: string;
  setAuthToken: (token: string) => void;
<<<<<<< HEAD
  updateAppMssgs: (msgList: AppMssg[]) => void;
  handleSearch: (val: string) => string | void;
  updateUserData: (data: UserDataProps) => void;
  signOut: () => void;
=======
  setAuthTokenForInternalUser: (token: string) => void;
  updateAppMssgs: (msgList: AppMssg[]) => void;
  handleSearch: (val: string) => string | void;
  updateUserData: (data: UserDataProps) => void;
  updateInternalUserData: (data: InternalUserDataProps) => void;
  signOut: () => void;
  signOutInternalUser: () => void;
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
}
