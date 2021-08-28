import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../appStyles/appStyles.module.css";
import { ErrorMssg, StatesUS } from "../../components/appTypes/appType";
import { errorHandling } from "../../components/formFuncs/errorFuncs";
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
  const [notLegal, toggleLegal] = useState(true)
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
    } catch (err) {
      const appMssgs = createAppMssgList([
        { message: err.message, msgType: 0 },
      ]);

      router.push(
        {
          pathname: "/Login",
          query: { appMssgs },
        },
        "/Login"
      );
    }
  };

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
              Please fill out the required fields.
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
          <div className="form-group">
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
          </div>
          <div
            className={`btn ${appColor} text-white w-25 mt-2 mr-3`}
            typeof="button"
            data-toggle="modal"
            data-target="#legalModal"
          >
            Review User Agreement
          </div>
          <button
            disabled={notLegal}
            type="submit"
            className={`btn ${appColor} text-white w-25 mt-2`}
          >
            Register
          </button>
        </form>
        <LegalModal agreementTitle="Beta User Agreement" update={toggleLegal} agreed={notLegal} />
      </div>
    </CardForm>
  );
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const stateList = await getStatesUS();

//   return {
//     props: {
//       data: stateList,
//     },
//   };
// };
