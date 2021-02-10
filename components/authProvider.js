import { createContext, useContext, useEffect, useState } from "react";
import { storeTokens } from "../lib/apollo";
import { storeId } from "../pages/_app";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialAuthState = {
    token: undefined,
    userId: undefined,
    userData: undefined,
  };

  const [authState, setAuthState] = useState(initialAuthState);

  // const [userData, setUserData] = useState("");

  const [appErrors, setErrors] = useState([]);

  const [appMssgs, setAppMssgs] = useState([]);

  // useEffect(() => {
  //   if (localStorage.getItem("userId") !== authState.userId) {
  //     setAuthState({ ...authState, userId: localStorage.getItem("userId") });
  //   }
  // }, [authState]);

  // const signIn = (token) => {
  //   storeToken(token);
  //   // setAuthState({ ...authState, userId, token });
  // };

  const setAuthToken = ({ userId, token }) => {
    storeTokens(token);
    setAuthState({ ...authState, userId, token });
  };

  const updateErrors = (errorList) => {
    setErrors(errorList);
  };

  const updateAppMessages = (msgList) => {
    setAppMssgs(msgList);
  };

  const updateUserData = (userData) => {
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
        appErrors,
        appMssgs,
        setAuthToken,
        signOut,
        updateErrors,
        updateAppMessages,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider as default, useAuth };
