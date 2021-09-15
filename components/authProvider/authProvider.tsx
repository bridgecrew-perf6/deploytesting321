import { createContext, useContext, useEffect, useState } from "react";
import { storeTokens } from "../../lib/apollo";
import { AppMssg, User, UserDataProps } from "../appTypes/appType";

const AuthContext = createContext<AppContextInterface | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const initialAuthState: UserDataProps = {
    getUserData: {
      appToken: "",
      user: { _id: "", appid: "", email: "" },
    },
  };

  const [authState, setAuthState] = useState(initialAuthState);

  const [appMssgs, setAppMssgs] = useState<AppMssg[]>([]); //This may not be needed since you can pass mssgs between pages.  Think of removing

  const [searchVal, updateSearchVal] = useState("");

  const handleSearch = (val: string) => {
    updateSearchVal(val);
  };

  const setAuthToken = (token: string) => {
    storeTokens(token);
    const updatedAuthState: UserDataProps = {
      getUserData: { ...authState.getUserData, appToken: token },
    };
    setAuthState(updatedAuthState);
  };

  const updateAppMssgs = (msgList: AppMssg[]) => {
    //This may not be needed since you can pass mssgs between pages.  Think of removing
    setAppMssgs(msgList);
  };

  const updateUserData = (userData: UserDataProps) => {
    setAuthState(userData);
  };

  const signOut = () => {
    setAuthState(initialAuthState);

    if (typeof window !== "undefined") {
      localStorage.removeItem("poldItUser");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        appMssgs,
        searchVal,
        setAuthToken,
        updateAppMssgs,
        handleSearch,
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
