// interface AuthState {
//   token?: string;
//   userId?: string;
//   userData?: String;
// }

import { InternalUserDataProps } from "_components/appTypes/appType";

export interface AppContextInterface {
  internalUserAuthState: InternalUserDataProps;
  authState: UserDataProps;
  appMssgs: AppMssg[];
  searchVal: string;
  setAuthToken: (token: string) => void;
  setAuthTokenForInternalUser: (token: string) => void;
  updateAppMssgs: (msgList: AppMssg[]) => void;
  handleSearch: (val: string) => string | void;
  updateUserData: (data: UserDataProps) => void;
  updateInternalUserData: (data: InternalUserDataProps) => void;
  signOut: () => void;
  signOutInternalUser: () => void;
}
