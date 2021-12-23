import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../../appStyles/appStyles.module.css";
import { ErrorMssg, StatesUS } from "../../../components/appTypes/appType";
import { errorHandling } from "../../../components/formFuncs/errorFuncs";
import {
  createAppMssgList,
  getFormBorderStyle,
} from "../../../components/formFuncs/miscFuncs";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings/index";
import { CardForm } from "../../../components/layout/CompStyles";
import { StateVals } from "../../../components/formFuncs/formFuncs";
import LegalModal from "../../../components/pageComponents/Other/Legal/legalModal";
import { AnyPointerEvent } from "framer-motion/types/gestures/PanSession";

const { appColor, appTxt } = styles;

export function getServerSideProps(context: any) {
  return {
    props: { params: context.params },
  };
}

export default function Registration({ params }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const { VERIFY_USER_EMAIL } = GraphResolvers.mutations;
  const router = useRouter();

  //Mutations -----------------------------------------------------------------
  const [verifyUserEmail, { data, loading: verificationLoading, error }] =
    useMutation(VERIFY_USER_EMAIL);
  // Mujtation End ------------------------------------------------------------

  return (
    <CardForm ctrStyle={"60%"} title={router.pathname}>
      <h1
        className={`d-flex justify-content-center align-items-center ${appTxt} ${appColor} p-2 text-center`}
        style={{ height: "8vh" }}
      >
        Email Verification
      </h1>
      <div className="card-body">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            verifyUserEmail({ variables: { tokken: params.tokken } }).catch(
              (err) => {
                console.log(err.message);
              }
            );
          }}
          id="emailVerification"
        >
          {!loading ? (
            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                className={`btn ${appColor} text-white w-25 mt-2`}
              >
                Verify
              </button>
            </div>
          ) : verificationLoading ? (
            <h1>Loading ...</h1>
          ) : (
            <h1>{!error ? "Email Verified !" : error.message}</h1>
          )}

          <h1>{data !== undefined && data.verifyUserEmail}</h1>
        </form>
      </div>
    </CardForm>
  );
}
