import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../appStyles/appStyles.module.css";
import { ErrorMssg, StatesUS } from "../../components/appTypes/appType";
import { errorHandling } from "../../components/formFuncs/errorFuncs";
import { AppMssgList, ErrorList } from "../../components/formFuncs/formFuncs";
import {
  createAppMssgList,
  getFormBorderStyle,
} from "../../components/formFuncs/miscFuncs";
import GraphResolvers from "../../lib/apollo/apiGraphStrings/index";
import { CardForm } from "../../components/layout/CompStyles";
import { StateVals } from "../../components/formFuncs/formFuncs";
import LegalModal from "../../components/pageComponents/Other/Legal/legalModal";

const { appColor, appTxt } = styles;

export default function Registration() {
  const [stateList, setStateList] = useState<StatesUS[]>([]);
  const [notLegal, toggleLegal] = useState(true);
  const [formErrors, setFormErrors] = useState<ErrorMssg[]>([]);
  const [formValidation, setFormValidation] = useState<HTMLFormElement>();
  const router = useRouter();

  const [createUser, { loading, error }] = useMutation(
    GraphResolvers.mutations.CREATE_USER
  );
  const { data } = useQuery(GraphResolvers.queries.GET_STATES_US);

  useEffect(() => {
    if (data) {
      setStateList(data.statesUS);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { formObj, errors } = errorHandling();
    const formObjFormatted = getFormBorderStyle(formObj);
    let appMssgs: string;

    if (errors.length > 0) {
      setFormErrors(errors);
      setFormValidation(formObjFormatted);
      return;
    }

    try {
      const user = await createUser({
        variables: { formInputs: JSON.stringify(formObj) },
      });
      appMssgs = createAppMssgList([
        { message: "Successfully Registered.  Please Log In.", msgType: 1 },
      ]);
      user &&
        router.push(
          {
            pathname: "/Login",
            query: { appMssgs },
          },
          "/Login"
        );
    } catch (err: any) {
      const appMssgs = createAppMssgList([
        { message: err.message, msgType: 0 },
      ]);
      setFormErrors([{message: err.message}]);
    }
  };

  const userAgreementError = formErrors.some((item) =>
    item.message.includes("User Agreement")
  );

  return (
    <CardForm ctrStyle={"60%"} title={router.pathname}>
      <h1
        className={`d-flex justify-content-center align-items-center ${appTxt} ${appColor} p-2 text-center`}
        style={{ height: "8vh" }}
      >
        REGISTRATION
      </h1>
      <div className="card-body">
        <form onSubmit={handleSubmit} id="registration">
          {formErrors.length > 0 && (
            <div className="alert alert-danger">
              {formErrors.map((msg) => (
                <label>{msg.message}</label>
              ))}
              {userAgreementError && (
                <label>
                  Please review the User Agreement and click the check box to
                  confirm
                </label>
              )}
            </div>
          )}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">First Name</label>
              <input
                type="text"
                className={
                  formValidation ? formValidation["firstname"] : "form-control"
                }
                id="FirstName"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Last Name</label>
              <input
                type="text"
                className={
                  formValidation ? formValidation["lastname"] : "form-control"
                }
                id="LastName"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail4">Email</label>
            <input
              type="email"
              className={
                formValidation ? formValidation["email"] : "form-control"
              }
              id="email"
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputUserId">User Id</label>
              <input
                type="text"
                className={
                  formValidation ? formValidation["appid"] : "form-control"
                }
                id="appid"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Password</label>
              <input
                type="password"
                className={
                  formValidation ? formValidation["password"] : "form-control"
                }
                id="password"
              />
            </div>
          </div>
          {/* <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <input
              type="text"
              className={
                formValidation ? formValidation["address1"] : "form-control"
              }
              id="address1"
              placeholder="Street Address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Address 2</label>
            <input
              type="text"
              className="form-control"
              id="address2"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="inputCity">City</label>
              <input
                type="text"
                className={
                  formValidation ? formValidation["city"] : "form-control"
                }
                id="city"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState">State</label>
              <select
                id="State"
                className={
                  formValidation ? formValidation["state"] : "form-control"
                }
              >
                <option>Select State</option>
                {stateList.length > 0 ? (
                  <StateVals stateList={stateList} />
                ) : (
                  <option>Loading...</option>
                )}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputZip">Zip</label>
              <input
                type="text"
                className={
                  formValidation ? formValidation["zipcode"] : "form-control"
                }
                id="Zipcode"
              />
            </div>
          </div> */}
          <div className="form-group form-check">
            <input
              type="checkbox"
              onClick={() => toggleLegal(!notLegal)}
              className="form-check-input"
              id="userAgreementAgreed"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              I agree to the terms and conditions of the
            </label>
            <a href="" data-toggle="modal" data-target="#legalModal">
              {" "}
              User Agreement
            </a>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="submit"
              className={`btn ${appColor} text-white w-25 mt-2`}
            >
              Register
            </button>
            <label htmlFor="">
              Already Registered? Click here to go back to the{" "}
              <a href="/Login">Login Page</a>
            </label>
          </div>
        </form>
        <LegalModal agreementTitle="Beta User Agreement" />
      </div>
      {/* {formErrors.length > 0 && <ErrorList errors={formErrors} />} */}
    </CardForm>
  );
}
