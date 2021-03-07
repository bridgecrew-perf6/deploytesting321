import { createContext, useContext, useEffect, useState } from "react";
import { storeTokens } from "../../lib/apollo";

const AuthContext = createContext<AppContextInterface | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const initialAuthState: AuthState = {
    token: "",
    userId: "",
    userData: "",
  };

  const [authState, setAuthState] = useState(initialAuthState);

  const [appMssgs, setAppMssgs] = useState<AppMssg[]>([]);

  const setAuthToken = ({ userId, token }: AuthState) => {
    storeTokens(token);
    setAuthState({ ...authState, userId, token });
  };

  const updateAppMssgs = (msgList: AppMssg[]) => {
    setAppMssgs(msgList);
  };

  const updateUserData = (userData: String) => {
    setAuthState({ ...authState, userData });
  };

  const signOut = () => {
    setAuthState(initialAuthState);

    if (typeof window !== "undefined") {
      localStorage.removeItem("useId");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        appMssgs,
        setAuthToken,
        updateAppMssgs,
        updateUserData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider as default, useAuth };
