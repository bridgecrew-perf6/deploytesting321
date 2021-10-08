import React, { useState } from "react";
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

const index = () => {
  const [masterCategory, setMasterCategory] = useState(adminData);
  return (
    <SitePageContainer title="Admin Panel">
      <div className={usersInfoBox.adminWrapper}>
        <LeftSideBar
          mastercategory={masterCategory}
          setmastercategory={setMasterCategory}
        />
        <div className={usersInfoBox.adminContentWrapper}>
          {masterCategory.map((lsc, index) => {
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
                ) : slsc.name === "Flagged Answers" && slsc.active === true ? (
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
