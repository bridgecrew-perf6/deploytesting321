import { useState, useEffect } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../appStyles/appStyles.module.css";
import { LogoText } from "../../components/layout/branding";
import { CardForm } from "../../components/layout/CompStyles";
import { errorHandling } from "../../components/formFuncs/errorFuncs";
import {ErrorList} from '../../components/formFuncs/formFuncs'
// import {
//   errorHandling,
//   ErrorList,
// } from "../../components/formFuncs/errorFuncs";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../components/authProvider/authProvider";
import GraphResolvers from "../../lib/apollo/apiGraphStrings";
import { ErrorMssg } from "../../components/appTypes/appType";

const LogIn: NextPage = () => {
  const [loggedIn, toggleLoggedIn] = useState(false);
  const [formErrors, setFormErrors] = useState<ErrorMssg[]>([]);
  // const [formMssgs, setFormMssgs] = useState([]);

  useEffect(() => {
    // handleOtherFormMssgs();
    setFormErrors([]);
    toggleLoggedIn(false);
  }, []);

  const appContext = useAuth();
  // const { setAuthToken, appMssgs, updateAppMssgs } = useAuth();
  // const { setAuthToken, appErrors, updateErrors } = useAuth();
  const router = useRouter();
  const { queries, mutations } = GraphResolvers;
  const [login, { loading, error }] = useMutation(mutations.LOGIN);

  // const handleOtherFormMssgs = () => {
  //   const { registered, userExists, authError } = props.query;
  //   const otherFormMssg = [];

  //   userExists && otherFormMssg.push("User already Exists. Please Log In.");
  //   registered && otherFormMssg.push("You are now Registered. Please Log In.");
  //   authError && otherFormMssg.push("Access Token Expired.  Please Log In.");

  //   setFormMssgs([...formMssgs, otherFormMssg]);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { formObj, errors } = errorHandling();
    setFormErrors(errors);

    if (errors.length === 0) {
      try {
        const { data } = await login({
          variables: { credentials: JSON.stringify(formObj) },
        });
        appContext?.setAuthToken(data.login);
        appContext?.updateAppMssgs([]);
        router.push("/");
      } catch (err) {
        setFormErrors([err]);
      }
    }
  };

  return (
    <CardForm ctrStyle={"55%"} title={router.pathname}>
      <div className={`${styles.appColor} text-white`}>
        <LogoText />
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} id="login">
          {appContext && appContext.appMssgs.length > 0 && (
            <ErrorList errors={appContext.appMssgs} />
          )}
          {/* {formMssgs.length > 0 &&
            formMssgs.map((msg, idx) => (
              <div className={classStyle} key={idx}>
                {msg}
              </div>
            ))} */}
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
              className={`btn ${styles.appColor} text-white  w-25`}
            >
              Log In
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
