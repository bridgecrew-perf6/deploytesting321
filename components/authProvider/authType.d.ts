
// interface AuthState {
//   token?: string;
//   userId?: string;
//   userData?: String;
// }

interface AppContextInterface {
  authState: UserDataProps;
  appMssgs: AppMssg[];
  setAuthToken: (token: string) => void;
  updateAppMssgs: (msgList: AppMssg[]) => void;
  updateUserData: (data: UserDataProps) => void;
  signOut: () => void;
};