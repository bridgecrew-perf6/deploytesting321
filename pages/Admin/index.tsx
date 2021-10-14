import React, { useEffect, useState } from "react";
import { SitePageContainer, adminData } from "_components/index";
import {
  FAnswers,
  FChatMsgs,
  FPolls,
  LeftSideBar,
  Metrics,
  ProvideAR,
  ReviewStatusForViolation,
} from "_pageComponents/index";
import UsersInfo from "./UsersInfo/UsersInfo";
import usersInfoBox from "../../appStyles/adminStyles/usersInfoBox.module.css";
import GraphResolvers from "../../lib/apollo/apiGraphStrings";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { AppLoadingLite } from "_components/pageComponents/Other/Loading";

const index = () => {
  const [masterCategory, setMasterCategory] = useState(adminData);
  const [loadingChecks, setLoadingChecks] = useState(true);
  const router = useRouter();
  const query = GraphResolvers.queries;
  const [getInternalUser, { data, loading }] = useLazyQuery(
    query.GET_SINGLE_INTERNAL_USER
  );
  let cookie: any = Cookies.get("internalUserPolditSession");

  useEffect(() => {
    if (cookie) {
      let decoded: any = jwt_decode(cookie);
      if (!loading && decoded?.id) {
        getInternalUser({
          variables: {
            // userId: "6164260aa1eab0634a5cf3a0", //for admin
            userId: decoded?.id,
          },
        });
      }
    } else {
      router.push("/Admin/Login");
    }
  }, [data, loading]);

  if (!cookie || loading)
    return (
      <div className={usersInfoBox.centerLoadingComp}>
        <AppLoadingLite />
      </div>
    );

  return (
    <SitePageContainer title="Admin Panel">
      <div className={usersInfoBox.adminWrapper}>
        <LeftSideBar
          data={data}
          mastercategory={masterCategory}
          setmastercategory={setMasterCategory}
          loadingChecks={loadingChecks}
          setLoadingChecks={setLoadingChecks}
        />
        <div className={usersInfoBox.adminContentWrapper}>
          {!loadingChecks &&
            masterCategory?.map((lsc, index) => {
              return lsc.name === "Internal User Management (IUM)" &&
                lsc.selected === true ? (
                <React.Fragment key={index}>
                  <UsersInfo />
                </React.Fragment>
              ) : lsc.name === "User Groups" && lsc.selected === true ? (
                <React.Fragment key={index}>
                  <h3>Hi i represent user groups</h3>
                </React.Fragment>
              ) : lsc.name === "Metrics" && lsc.selected === true ? (
                <React.Fragment key={index}>
                  <Metrics />
                </React.Fragment>
              ) : (
                lsc?.subCategory &&
                lsc.subCategory.map((slsc, sindex) => {
                  return slsc.name === "Provide user rights" &&
                    slsc.active === true ? (
                    <React.Fragment key={sindex}>
                      <ProvideAR />
                    </React.Fragment>
                  ) : slsc.name === "Content" && slsc.active === true ? (
                    <React.Fragment key={sindex}>
                      <h2>Hi im Content</h2>
                    </React.Fragment>
                  ) : slsc.name === "Users" && slsc.active === true ? (
                    <React.Fragment key={sindex}>
                      <h2>Hi im Users</h2>
                    </React.Fragment>
                  ) : slsc.name === "Blocked Users" && slsc.active === true ? (
                    <React.Fragment key={sindex}>
                      <h2>Hi im Blocked Users</h2>
                    </React.Fragment>
                  ) : slsc.name === "Flagged Users" && slsc.active === true ? (
                    <React.Fragment key={sindex}>
                      <h2>Hi im Flagged Users</h2>
                    </React.Fragment>
                  ) : slsc.name === "Flagged Polls" && slsc.active === true ? (
                    <React.Fragment key={sindex}>
                      <FPolls />
                    </React.Fragment>
                  ) : slsc.name === "Flagged Chat Messages" &&
                    slsc.active === true ? (
                    <React.Fragment key={sindex}>
                      <FChatMsgs />
                    </React.Fragment>
                  ) : slsc.name === "Flagged Answers" &&
                    slsc.active === true ? (
                    <React.Fragment key={sindex}>
                      <FAnswers />
                    </React.Fragment>
                  ) : slsc.name === "Review status for violation" &&
                    slsc.active === true ? (
                    <React.Fragment key={sindex}>
                      <ReviewStatusForViolation />
                    </React.Fragment>
                  ) : null;
                })
              );
            })}
        </div>
      </div>
    </SitePageContainer>
  );
};

export default index;
