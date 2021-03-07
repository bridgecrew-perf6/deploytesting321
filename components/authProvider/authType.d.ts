
interface AuthState {
  token?: string;
  userId?: string;
  userData?: String;
}

interface AppContextInterface {
  authState: AuthState;
  appMssgs: AppMssg[];
  setAuthToken: (authState: AuthState) => void;
  updateAppMssgs: (msgList: AppMssg[]) => void;
  updateUserData: (data: String) => void;
  signOut?: () => void;
};