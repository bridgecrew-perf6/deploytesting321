import { createContext, useContext, useEffect, useState } from "react";
import { storeTokens } from "../../lib/apollo";
import {
  AppMssg,
} from "../appTypes/appType";
import { AppContextInterface } from "./authType";

const AuthContext = createContext<AppContextInterface | null>(null);

const AuthProvider: React.FC = ({ children }) => {

  
  const [authState, setAuthState] = useState(null);
  const [appMssgs, setAppMssgs] = useState<AppMssg[]>([]); //This may not be needed since you can pass mssgs between pages.  Think of removing
  const [searchVal, updateSearchVal] = useState("");

  const handleSearch = (val: string) => {
    updateSearchVal(val);
  };
 
  const setAuthToken = (token: string) => {
    // const updatedAuthState: any = {
    //   getUserData: { ...authState?.getUserData },
    // };
    // setAuthState(token);
  };

  const updateAppMssgs = (msgList: AppMssg[]) => {
    //This may not be needed since you can pass mssgs between pages.  Think of removing
    setAppMssgs(msgList);
  };

  const updateUserData = (userData:any) => {
    const updatedAuthState: any = {
      getUserData: { ...userData?.getAppUserData },
    };
    setAuthState(updatedAuthState);
  };

  const signOut = () => {
    const updatedAuthState: any = {
      getUserData: null,
    };
    setAuthState(updatedAuthState);

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
