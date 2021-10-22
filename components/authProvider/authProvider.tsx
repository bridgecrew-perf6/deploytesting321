import { createContext, useContext, useEffect, useState } from "react";
import { storeTokens } from "../../lib/apollo";
<<<<<<< HEAD
import { AppMssg, User, UserDataProps } from "../appTypes/appType";
=======
import {
  AppMssg,
  InternalUserDataProps,
  User,
  UserDataProps,
} from "../appTypes/appType";
import { AppContextInterface } from "./authType";
import jwt_decode from "jwt-decode";
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5

const AuthContext = createContext<AppContextInterface | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const initialAuthState: UserDataProps = {
    getUserData: {
      appToken: "",
      user: { _id: "", appid: "", email: "" },
    },
  };

<<<<<<< HEAD
  const [authState, setAuthState] = useState(initialAuthState);

  const [appMssgs, setAppMssgs] = useState<AppMssg[]>([]); //This may not be needed since you can pass mssgs between pages.  Think of removing

=======
  const initialAuthStateForInternlaUser: InternalUserDataProps = {
    getInternalUserData: {
      appToken: "",
      internalUser: { _id: "", email: "", accessRole: "" },
    },
  };

  const [internalUserAuthState, setInternalUserAuthState] = useState(
    initialAuthStateForInternlaUser
  );
  const [authState, setAuthState] = useState(initialAuthState);
  const [appMssgs, setAppMssgs] = useState<AppMssg[]>([]); //This may not be needed since you can pass mssgs between pages.  Think of removing
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
  const [searchVal, updateSearchVal] = useState("");

  const handleSearch = (val: string) => {
    updateSearchVal(val);
  };

<<<<<<< HEAD
=======
  const setAuthTokenForInternalUser = (token: string) => {
    let tokenData: any;
    storeTokens(token);
    tokenData = jwt_decode(token);

    const updatedInternalUserToken: InternalUserDataProps = {
      getInternalUserData: {
        ...internalUserAuthState.getInternalUserData,
        appToken: token,
        internalUser: {
          ...internalUserAuthState.getInternalUserData.internalUser,
          _id: tokenData.id,
          accessRole: tokenData.roleId,
        },
      },
    };
    setInternalUserAuthState(updatedInternalUserToken);
  };

>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
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

<<<<<<< HEAD
=======
  const updateInternalUserData = (internalUser: InternalUserDataProps) => {
    setInternalUserAuthState(internalUser);
  };

  const signOutInternalUser = () => {
    setInternalUserAuthState(initialAuthStateForInternlaUser);

    // if (typeof window !== "undefined") {
    //   localStorage.removeItem("poldItUser");
    // }
  };

>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
  const signOut = () => {
    setAuthState(initialAuthState);

    if (typeof window !== "undefined") {
      localStorage.removeItem("poldItUser");
    }
  };

  return (
    <AuthContext.Provider
      value={{
<<<<<<< HEAD
=======
        internalUserAuthState,
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
        authState,
        appMssgs,
        searchVal,
        setAuthToken,
<<<<<<< HEAD
        updateAppMssgs,
        handleSearch,
        updateUserData,
        signOut,
=======
        setAuthTokenForInternalUser,
        updateAppMssgs,
        handleSearch,
        updateUserData,
        updateInternalUserData,
        signOut,
        signOutInternalUser,
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider as default, useAuth };
