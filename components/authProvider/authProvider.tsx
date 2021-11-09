import { createContext, useContext, useEffect, useState } from "react";
import { storeTokens } from "../../lib/apollo";
import {
  AppMssg,
  InternalUserDataProps,
  User,
  UserDataProps,
} from "../appTypes/appType";
import { AppContextInterface } from "./authType";

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

  // const setAuthTokenForInternalUser = (token: string) => {
  //   let tokenData: any;
  //   storeTokens(token);
  //   tokenData = jwt_decode(token);

  //   const updatedInternalUserToken: InternalUserDataProps = {
  //     getInternalUserData: {
  //       ...internalUserAuthState.getInternalUserData,
  //       appToken: token,
  //       internalUser: {
  //         ...internalUserAuthState.getInternalUserData.internalUser,
  //         _id: tokenData.id,
  //         accessRole: tokenData.roleId,
  //       },
  //     },
  //   };
  //   setInternalUserAuthState(updatedInternalUserToken);
  // };

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

  const updateUserData = (userData: UserDataProps, token: string) => {
    storeTokens(token);
    const updatedAuthState: UserDataProps = {
      getUserData: { ...userData.getUserData, appToken: token },
    };
    setAuthState(updatedAuthState);
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
