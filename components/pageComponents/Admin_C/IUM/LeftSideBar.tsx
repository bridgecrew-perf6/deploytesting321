import React, { useState } from "react";
import leftSideBarStyles from "../../../../appStyles/adminStyles/leftSideBarStyles.module.css";
import { FaTachometerAlt } from "react-icons/fa";
import LeftSideSubBar from "./LeftSideSubBar";
import {
  adminLeftSidebarType,
  masterCatType,
  subCatType,
} from "_components/index";

const LeftSideBar = (props: adminLeftSidebarType) => {
  const { mastercategory, setmastercategory } = props;

  const handleOpenMaster = (item: masterCatType) => {
    let cats = false;
    let updatedMaster = mastercategory.map((mc: masterCatType) => {
      if (mc._id === item._id) {
        if (!mc.active) {
          if (mc.subCategory.length > 0) {
            mc.active = true;
          } else {
            mc.active = true;
            mc.selected = true;
          }
        } else {
          mc.active = false;
          mc.selected = false;
        }
      } else {
        if (item?.subCategory.length === 0) {
          if (mc.subCategory.length === 0) {
            mc.active = false;
            mc.selected = false;
          }
        }
      }
      if (item.subCategory.length > 0) {
        cats = true;
      }
      return mc;
    });

    updatedMaster.map((master: masterCatType) => {
      let updated = master.subCategory?.map((sub: subCatType) => {
        if (!cats) {
          sub.active = false;
        }
        return sub;
      });
      if (master.subCategory) master.subCategory = updated;
      return master;
    });

    setmastercategory(updatedMaster);
  };

  const handleOpenSub = (item: masterCatType) => {
    console.log("I am clicked");
    let updatedMaster = mastercategory.map((mc: masterCatType) => {
      if (mc?.subCategory.length > 0) {
        let sub = mc.subCategory.map((subItem: subCatType) => {
          if (subItem._id === item._id) {
            subItem.active = true;
          } else {
            subItem.active = false;
          }
          return subItem;
        });
        mc.subCategory = sub;
      }
      return mc;
    });

    mastercategory.map((master: masterCatType) => {
      if (master?.subCategory.length === 0) {
        master.active = false;
        master.selected = false;
      }
    });

    setmastercategory(updatedMaster);
  };

  return (
    <div className={leftSideBarStyles.sideBarWrapper}>
      <div className={leftSideBarStyles.buttonsWrapper}>
        <button className={leftSideBarStyles.dashBoard}>
          <FaTachometerAlt style={{ marginTop: "-0.25rem" }} />
          <span style={{ paddingLeft: ".5rem" }}> &nbsp;Dashboard</span>
        </button>

        {mastercategory.map((mc: masterCatType, mindex: number) => {
          return (
            <LeftSideSubBar
              handleOpenSub={handleOpenSub}
              handleOpenMaster={handleOpenMaster}
              key={mindex}
              item={mc}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LeftSideBar;
