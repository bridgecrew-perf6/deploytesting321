import React, { useState } from "react";
import leftSideBarStyles from "../../../../appStyles/adminStyles/leftSideBarStyles.module.css";
import { FaTachometerAlt } from "react-icons/fa";
import LeftSideSubBar from "./LeftSideSubBar";

const LeftSideBar = (props: any) => {
  const { mastercategory, setmastercategory } = props;
  const handleOpenMaster = (item: any) => {
    let cats = false;
    let updatedMaster = mastercategory.map((mc: any) => {
      if (mc._id === item._id) {
        if (!mc.active) {
          if (mc.subCategory) {
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
        if (!item?.subCategory) {
          if (!mc.subCategory) {
            mc.active = false;
            mc.selected = false;
          }
        }
      }
      if (item.subCategory) {
        cats = true;
      }
      return mc;
    });

    updatedMaster.map((master: any) => {
      let updated =
        master.subCategory &&
        master.subCategory.map((sub: any) => {
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

  const handleOpenSub = (item: any) => {
    let updatedMaster = mastercategory.map((mc: any) => {
      if (mc?.subCategory) {
        let sub = mc.subCategory.map((subItem: any) => {
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

    mastercategory.map((master: any) => {
      if (!master?.subCategory) {
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

        {mastercategory.map((mc: any, mindex: any) => {
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
