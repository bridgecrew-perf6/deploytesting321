// interface AuthState {
//   token?: string;
//   userId?: string;
//   userData?: String;
// }

interface AppContextInterface {
  authState: UserDataProps;
  appMssgs: AppMssg[];
  searchVal: string;
  setAuthToken: (token: string) => void;
  updateAppMssgs: (msgList: AppMssg[]) => void;
  handleSearch: (val: string) => string | void;
  updateUserData: (data: UserDataProps) => void;
  signOut: () => void;
}
