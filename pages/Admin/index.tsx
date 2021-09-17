import React, { useState } from "react";
import {
  AdminLeftSideBarCategoryItems,
  SitePageContainer,
} from "_components/index";
import { LeftSideBar, Metrics } from "_pageComponents/index";
import { v4 } from "uuid";
import UsersInfo from "./UsersInfo/UsersInfo";

const index = () => {
  const [leftSideCategory, setLeftSideCategory] = useState<
    AdminLeftSideBarCategoryItems[]
  >([
    {
      _id: v4(),
      name: "Users",
      active: true,
      categoryOf: "",
      haveCats: false,
      selected: true,
    },
    {
      _id: v4(),
      name: "Access Rights",
      active: true,
      categoryOf: "",
      haveCats: true,
      selected: false,
    },
    {
      _id: v4(),
      name: "Moderation",
      active: true,
      categoryOf: "",
      haveCats: true,
      selected: false,
    },
    {
      _id: v4(),
      name: "Security",
      active: true,
      categoryOf: "",
      haveCats: true,
      selected: false,
    },
    {
      _id: v4(),
      name: "Metrics",
      active: false,
      categoryOf: "",
      haveCats: false,
      selected: false,
    },
  ]);

  const [leftSideSubCategory, setLeftSideSubCategory] = useState<
    AdminLeftSideBarCategoryItems[]
  >([
    {
      _id: v4(),
      name: "Admin",
      active: false,
      categoryOf: "Access Rights",
      haveCats: false,
      selected: false,
    },
    {
      _id: v4(),
      name: "Employee",
      active: false,
      categoryOf: "Access Rights",
      haveCats: false,
      selected: false,
    },
    {
      _id: v4(),
      name: "Content",
      active: false,
      categoryOf: "Moderation",
      haveCats: false,
      selected: false,
    },
    {
      _id: v4(),
      name: "Users",
      active: false,
      categoryOf: "Moderation",
      haveCats: false,
      selected: false,
    },
    {
      _id: v4(),
      name: "Blocked Users",
      active: false,
      categoryOf: "Security",
      haveCats: false,
      selected: false,
    },
    {
      _id: v4(),
      name: "Flagged Users",
      active: false,
      categoryOf: "Security",
      haveCats: false,
      selected: false,
    },
  ]);

  return (
    <SitePageContainer title="Admin Panel">
      <div style={{ marginTop: "60px" }}>
        <LeftSideBar
          leftSideCategory={leftSideCategory}
          subCategory={leftSideSubCategory}
          setLeftSideCategory={setLeftSideCategory}
          setLeftSideSubCategory={setLeftSideSubCategory}
        />
        <div style={{ marginLeft: "18rem" }}>
          {leftSideCategory.map((lsc, index) => {
            {
              return lsc.name === "Users" && lsc.selected === true ? (
                <React.Fragment key={index}>
                  <UsersInfo />
                </React.Fragment>
              ) : lsc.name === "Metrics" && lsc.selected === true ? (
                <React.Fragment key={index}>
                  <Metrics />
                </React.Fragment>
              ) : null;
            }
          })}
        </div>

        <div style={{ marginLeft: "18rem" }}>
          {leftSideSubCategory.map((slsc, index) => {
            {
              return slsc.name === "Admin" && slsc.selected === true ? (
                <React.Fragment key={index}>
                  <p>Hi im Admin</p>
                </React.Fragment>
              ) : slsc.name === "Employee" && slsc.selected === true ? (
                <React.Fragment key={index}>
                  <h2>Hi im Employee</h2>
                </React.Fragment>
              ) : slsc.name === "Content" && slsc.selected === true ? (
                <React.Fragment key={index}>
                  <h2>Hi im Content</h2>
                </React.Fragment>
              ) : slsc.name === "Users" && slsc.selected === true ? (
                <React.Fragment key={index}>
                  <h2>Hi im Users</h2>
                </React.Fragment>
              ) : slsc.name === "Blocked Users" && slsc.selected === true ? (
                <React.Fragment key={index}>
                  <h2>Hi im Blocked Users</h2>
                </React.Fragment>
              ) : slsc.name === "Flagged Users" && slsc.selected === true ? (
                <React.Fragment key={index}>
                  <h2>Hi im Flagged Users</h2>
                </React.Fragment>
              ) : null;
            }
          })}
        </div>
      </div>
    </SitePageContainer>
  );
};

export default index;
