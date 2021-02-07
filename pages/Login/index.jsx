import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../appStyles/appStyles.module.css";
import { LogoText } from "../../components/layout/branding";
import { CardForm } from "../../components/layout/CompStyles";
import {
  errorHandling,
  ErrorList,
} from "../../components/formFuncs/errorFuncs";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../../components/authProvider";
import GraphResolvers from "../../lib/apollo/apiGraphStrings";

export default function LogIn() {
  const [loggedIn, toggleLoggedIn] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  // const [formMssgs, setFormMssgs] = useState([]);

  useEffect(() => {
    // handleOtherFormMssgs();
    setFormErrors([]);
    toggleLoggedIn(false);
  }, []);

  const { setAuthToken, appErrors, updateErrors } = useAuth();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { formObj, errors } = errorHandling();
    setFormErrors(errors);

    if (errors.length === 0) {
      try {
        const { data } = await login({
          variables: { credentials: JSON.stringify(formObj) },
        });
        setAuthToken(data.login);
        updateErrors([]);
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
          {appErrors.length > 0 && <ErrorList errors={appErrors} />}
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
}
