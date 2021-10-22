import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../../appStyles/appStyles.module.css";
import { LogoText } from "../../../components/layout/branding";
import { CardForm } from "../../../components/layout/CompStyles";
import { errorHandling } from "../../../components/formFuncs/errorFuncs";
import { ErrorList } from "../../../components/formFuncs/formFuncs";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../../components/authProvider/authProvider";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { ErrorMssg } from "../../../components/appTypes/appType";
import jwt_decode from "jwt-decode";

const chnagePassword: NextPage = () => {
  const [formErrors, setFormErrors] = useState<ErrorMssg[]>([]);
  const router = useRouter();
  const { tokenId } = router.query;
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setFormErrors([]);
  }, []);

  useEffect(() => {
    if (tokenId) {
      var decoded: any = jwt_decode(tokenId.toString());
      setUserId(decoded.id);
    }
  }, [tokenId]);

  const { queries, mutations } = GraphResolvers;
  const [login, { loading, error }] = useMutation(mutations.LOGIN, {
    refetchQueries: [{ query: queries.GET_USER, variables: { userId: "" } }],
  });
  const [
    changeInternalUserPassword,
    { loading: changePassLoading, error: changePassError },
  ] = useMutation(mutations.CHANGE_INTERNAL_USER_PASSWORD, {
    onCompleted: () => router.push("/Admin"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { formObj, errors } = errorHandling();
    setFormErrors(errors);
    console.log(formObj);
    if (formObj.newPassword !== formObj.repeatPassword) {
      errors.push({ message: "New password does not match Repeat password!" });
    }
    if (changePassLoading)
      errors.push({
        message: "Could not change password. Please try again later",
      });

    if (errors.length === 0) {
      try {
        await changeInternalUserPassword({
          variables: {
            userId: userId,
            newPassword: formObj.newPassword,
          },
        });
      } catch (err: any) {
        setFormErrors([err]);
      }
    }
  };

  return (
    <CardForm ctrStyle={"55%"} title={router.pathname}>
      <div className={`${styles.appColor}`}>
        <LogoText />
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} id="changePassword">
          <div className="form-group text-left">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              className="form-control"
              id="New password"
              aria-describedby="passwordChange"
            />
          </div>
          <div className="form-group text-left">
            <label htmlFor="password">Repeat Password</label>
            <input
              type="password"
              className="form-control"
              id="Repeat password"
            />
          </div>

          {formErrors.length > 0 && <ErrorList errors={formErrors} />}

          <div className="form-group text-left mt-2">
            <button
              type="submit"
              className={`btn ${styles.appColor} text-white  w-25`}
              disabled={changePassLoading}
            >
              {changePassLoading ? (
                <div className="spinner-grow text-secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </CardForm>
  );
};

export default chnagePassword;
