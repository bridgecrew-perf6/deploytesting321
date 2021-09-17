import React from "react";
import leftSideBarStyles from "../../../appStyles/adminStyles/leftSideBarStyles.module.css";
import {
  BsCaretRightFill,
  BsCaretDownFill,
  BsFolder,
  BsFileEarmark,
  BsGraphUp,
} from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { AiFillSecurityScan, AiOutlineUser } from "react-icons/ai";
import {
  FaTachometerAlt,
  FaStickyNote,
  FaUser,
  FaUserSlash,
} from "react-icons/fa";

const LeftSideBar = (props: any) => {
  const {
    leftSideCategory,
    subCategory,
    setLeftSideCategory,
    setLeftSideSubCategory,
  } = props;

  console.log(leftSideCategory, subCategory);

  const handleOpenMaster = (mc: any) => {
    let subId = "";
    let cats = false;
    let othersHaveCats = false;
    let updatedMaster = leftSideCategory.map((lsc: any) => {
      if (lsc._id === mc._id) {
        //find and update to active
        if (!lsc.active) {
          //if not active than make it active and selected
          lsc.active = true;
        } else {
          //if already active than check if master have sub categories
          cats = true;
          if (!lsc.haveCats) {
            lsc.active = true;
          } else {
            lsc.active = false;
          }
        }
        if (!lsc.haveCats) {
          lsc.selected = true;
          cats = false;
          subId = "";
        } else {
          cats = true;
          lsc.selected = false;
        }
      } else {
        if (lsc.active) {
          console.log("I am active");
          if (lsc.haveCats) {
            lsc.active = true;
          }
        }
        if (lsc.haveCats) {
          lsc.selected = false;
        } else {
          lsc.selected = false;
        }
      }

      return lsc;
    });

    let updatedSub;
    if (subId === "") {
      if (!cats) {
        updatedSub = subCategory.map((sc: any) => {
          sc.selected = false;
          sc.active = false;
          return sc;
        });
        setLeftSideSubCategory(updatedSub);
      }
    }
    setLeftSideCategory(updatedMaster);
  };

  const handleOpenSub = (mc: any, sub: any) => {
    if (mc.name === sub.categoryOf) {
      let updatedSub = subCategory.map((sc: any) => {
        if (sc._id === sub._id) {
          if (!sc.active) {
            sc.active = true;
            sc.selected = true;
          }
        } else {
          sc.selected = false;
          sc.active = false;
        }
        return sc;
      });
      let updatedMaster = leftSideCategory.map((lsc: any) => {
        if (!lsc.haveCats) {
          lsc.active = false;
          lsc.selected = false;
        }
        return lsc;
      });
      setLeftSideCategory(updatedMaster);
      setLeftSideSubCategory(updatedSub);
    }
  };

  return (
    <div className={leftSideBarStyles.sideBarWrapper}>
      <div className={leftSideBarStyles.buttonsWrapper}>
        <button className={leftSideBarStyles.dashBoard}>
          <FaTachometerAlt style={{ marginTop: "-0.25rem" }} />
          <span style={{ paddingLeft: ".5rem" }}> &nbsp;Dashboard</span>
        </button>
        {leftSideCategory.length &&
          leftSideCategory.map((mc: any, mindex: any) => (
            <React.Fragment key={mindex}>
              <button
                onClick={() => handleOpenMaster(mc)}
                key={mindex}
                className={
                  mc?.active && mc?.selected
                    ? leftSideBarStyles.buttonsWrapper__masterButtonsSelected
                    : mc?.active
                    ? leftSideBarStyles.buttonsWrapper__masterButtonsActive
                    : leftSideBarStyles.buttonsWrapper__masterButtons
                }
              >
                &nbsp;
                {mc.name === "Users" ? (
                  <AiOutlineUser style={{ marginTop: "-0.25rem" }} />
                ) : mc.name === "Security" ? (
                  <AiFillSecurityScan style={{ marginTop: "-0.25rem" }} />
                ) : mc.name === "Metrics" ? (
                  <BsGraphUp style={{ marginTop: "-0.25rem" }} />
                ) : (
                  <BsFolder style={{ marginTop: "-0.25rem" }} />
                )}
                <span style={{ paddingLeft: ".5rem" }}>&nbsp;{mc?.name}</span>
                {mc?.haveCats ? (
                  mc?.active ? (
                    <BsCaretDownFill
                      className={leftSideBarStyles.openCategoryMenu}
                    />
                  ) : (
                    <BsCaretRightFill
                      className={leftSideBarStyles.openCategoryMenu}
                    />
                  )
                ) : null}
              </button>

              {subCategory.map((sub: any, sindex: any) =>
                sub.categoryOf === mc?.name ? (
                  <div
                    key={sindex}
                    onClick={() => handleOpenSub(mc, sub)}
                    className={
                      mc?.active
                        ? leftSideBarStyles.buttonsWrapper__showSubCats
                        : leftSideBarStyles.buttonsWrapper__isNotShowSubCats
                    }
                  >
                    <button
                      key={sindex}
                      className={
                        sub?.active
                          ? leftSideBarStyles.buttonsWrapper__subButtonActive
                          : leftSideBarStyles.buttonsWrapper__subButtons
                      }
                    >
                      {sub.name === "Users" ? (
                        <FaUser style={{ marginTop: "-0.25rem" }} />
                      ) : sub.name === "Content" ? (
                        <FaStickyNote style={{ marginTop: "-0.35rem" }} />
                      ) : sub.name === "Admin" ? (
                        <RiAdminFill style={{ marginTop: "-0.35rem" }} />
                      ) : sub.name === "Blocked Users" ? (
                        <FaUserSlash style={{ marginTop: "-0.35rem" }} />
                      ) : (
                        <BsFileEarmark style={{ marginTop: "-0.35rem" }} />
                      )}

                      <span style={{ paddingLeft: ".5rem" }}>
                        &nbsp;{sub?.name}
                      </span>
                    </button>
                  </div>
                ) : null
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
