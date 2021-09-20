import React, { useState } from "react";
import { SitePageContainer } from "_components/index";
import { LeftSideBar, Metrics } from "_pageComponents/index";
import { v4 } from "uuid";
import UsersInfo from "./UsersInfo/UsersInfo";
import { BsFolder, BsFileEarmark, BsGraphUp } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { AiFillSecurityScan, AiOutlineUser } from "react-icons/ai";
import { FaStickyNote, FaUser, FaUserSlash } from "react-icons/fa";

const index = () => {
  const [masterCategory, setMasterCategory] = useState([
    {
      _id: v4(),
      name: "Internal User Management (IUM)",
      active: true,
      selected: true,
      icon: <AiOutlineUser style={{ marginTop: "-0.25rem" }} />,
    },
    {
      _id: v4(),
      name: "Access Rights",
      active: true,
      selected: false,
      icon: <BsFolder style={{ marginTop: "-0.25rem" }} />,
      subCategory: [
        {
          _id: v4(),
          name: "Admin",
          active: false,
          selected: false,
          icon: <RiAdminFill style={{ marginTop: "-0.35rem" }} />,
        },
        {
          _id: v4(),
          name: "Employee",
          active: false,
          selected: false,
          icon: <BsFileEarmark style={{ marginTop: "-0.35rem" }} />,
        },
      ],
    },
    {
      _id: v4(),
      name: "Moderation",
      active: true,
      selected: false,
      icon: <BsFolder style={{ marginTop: "-0.25rem" }} />,
      subCategory: [
        {
          _id: v4(),
          name: "Content",
          active: false,
          selected: false,
          icon: <FaStickyNote style={{ marginTop: "-0.35rem" }} />,
        },
        {
          _id: v4(),
          name: "Users",
          active: false,
          selected: false,
          icon: <FaUser style={{ marginTop: "-0.25rem" }} />,
        },
      ],
    },
    {
      _id: v4(),
      name: "Security",
      active: true,
      selected: false,
      icon: <AiFillSecurityScan style={{ marginTop: "-0.25rem" }} />,
      subCategory: [
        {
          _id: v4(),
          name: "Blocked Users",
          active: false,
          selected: false,
          icon: <FaUserSlash style={{ marginTop: "-0.35rem" }} />,
        },
        {
          _id: v4(),
          name: "Flagged Users",
          active: false,
          selected: false,
          icon: <BsFileEarmark style={{ marginTop: "-0.35rem" }} />,
        },
      ],
    },
    {
      _id: v4(),
      name: "Metrics",
      active: false,
      selected: false,
      icon: <BsGraphUp style={{ marginTop: "-0.25rem" }} />,
    },
    {
      _id: v4(),
      name: "Templates",
      active: false,
      selected: false,
      icon: <BsGraphUp style={{ marginTop: "-0.25rem" }} />,
      subCategory: [
        {
          _id: v4(),
          name: "Email",
          active: false,
          selected: false,
          icon: <BsGraphUp style={{ marginTop: "-0.25rem" }} />,
        },
        {
          _id: v4(),
          name: "Site",
          active: false,
          selected: false,
          icon: <BsGraphUp style={{ marginTop: "-0.25rem" }} />,
        },
        {
          _id: v4(),
          name: "Pop-Ups",
          active: false,
          selected: false,
          icon: <BsGraphUp style={{ marginTop: "-0.25rem" }} />,
        },
      ],
    },
  ]);

  return (
    <SitePageContainer title="Admin Panel">
      <div style={{ marginTop: "60px" }}>
        <LeftSideBar
          mastercategory={masterCategory}
          setmastercategory={setMasterCategory}
        />
        <div style={{ marginLeft: "18rem" }}>
          {masterCategory.map((lsc, index) => {
            return lsc.name === "Internal User Management (IUM)" &&
              lsc.selected === true ? (
              <React.Fragment key={index}>
                <UsersInfo />
              </React.Fragment>
            ) : lsc.name === "Metrics" && lsc.selected === true ? (
              <React.Fragment key={index}>
                <Metrics />
              </React.Fragment>
            ) : (
              lsc?.subCategory &&
              lsc.subCategory.map((slsc, sindex) => {
                return slsc.name === "Admin" && slsc.active === true ? (
                  <React.Fragment key={sindex}>
                    <h2>Hi im Admin</h2>
                  </React.Fragment>
                ) : slsc.name === "Employee" && slsc.active === true ? (
                  <React.Fragment key={sindex}>
                    <h2>Hi im Employee</h2>
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
