import { useState, useEffect } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../../appStyles/appStyles.module.css";
import { LogoText } from "../../../components/layout/branding";
import { CardForm } from "../../../components/layout/CompStyles";
import { errorHandling } from "../../../components/formFuncs/errorFuncs";
import {
  AppMssgList,
  ErrorList,
} from "../../../components/formFuncs/formFuncs";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../../components/authProvider/authProvider";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { ErrorMssg } from "../../../components/appTypes/appType";

const LogIn: NextPage = () => {
  const [loggedIn, toggleLoggedIn] = useState(false);
  const [formErrors, setFormErrors] = useState<ErrorMssg[]>([]);
  const [appMssgs, setAppMssgs] = useState<object[]>([]);

  useEffect(() => {
    handleOtherFormMssgs();
    setFormErrors([]);
    toggleLoggedIn(false);
  }, []);

  const appContext = useAuth();
  const router = useRouter();
  const { queries, mutations } = GraphResolvers;
  const [internalUserLogin, { loading, error }] = useMutation(
    mutations.LOGIN_INTERNAL_USER
  );

  const handleOtherFormMssgs = () => {
    const { appMssgs } = router.query;
    let msgList: any = appMssgs;
    msgList && setAppMssgs(JSON.parse(msgList));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { formObj, errors } = errorHandling();
    setFormErrors(errors);
    if (errors.length === 0) {
      try {
        const { data } = await internalUserLogin({
          variables: { email: formObj.email, password: formObj.password },
        });
        // console.log(data);
        appContext?.setAuthTokenForInternalUser(data.internalUserLogin);
        setAppMssgs([]);
        router.push("/Admin");
      } catch (err: any) {
        console.log(err);
        setFormErrors([err]);
      }
    }
  };

  return (
    <CardForm ctrStyle={"55%"} title={router.pathname}>
      <div className={`${styles.appColor}`}>
        <LogoText onClick={() => router.push("/")} />
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} id="login">
          {appMssgs.length > 0 && <AppMssgList mssgs={appMssgs} />}
          <div className="form-group text-left">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group text-left">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>

          {formErrors.length > 0 && <ErrorList errors={formErrors} />}

          <div className="form-group text-left mt-2">
            <button
              type="submit"
              className={`btn ${styles.appColor} ${styles.appWidth} text-white`}
            >
              Internal User Login
            </button>
          </div>
          <div className="form-group text-left">
            <small id="registerHelp" className="form-text text-muted pb-2">
              New to POLDIT? Register here.
            </small>
            <Link href={"/Registration"}>
              <button
                type="button"
                className={`btn ${styles.appColor} text-white  w-25`}
              >
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </CardForm>
  );
};

export default LogIn;
