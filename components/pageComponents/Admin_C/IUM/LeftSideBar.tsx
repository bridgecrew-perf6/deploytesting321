import React, { useEffect, useState } from "react";
import leftSideBarStyles from "../../../../appStyles/adminStyles/leftSideBarStyles.module.css";
import { FaTachometerAlt } from "react-icons/fa";
import LeftSideSubBar from "./LeftSideSubBar";
import {
  adminLeftSidebarType,
  masterCatType,
  subCatType,
} from "_components/index";
import { useQuery } from "@apollo/client";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
// adminLeftSidebarType;
const LeftSideBar = (props: adminLeftSidebarType) => {
  const {
    mastercategory,
    setmastercategory,
    setLoadingChecks,
    loadingChecks,
    data,
    // userId,
  } = props;

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

  const query = GraphResolvers.queries;

  const [role, setRole] = useState("");

  const filterCategories = () => {
    console.log(role);
    if (role === "admin") {
      setmastercategory(mastercategory);
    } else {
      let newUpdated;
      if (role === "moderator" || role === "employee" || role === "site user") {
        let updated = mastercategory?.filter((m: masterCatType) => {
          return (
            m.name !== "Internal User Management (IUM)" &&
            m.name !== "Access Rights"
          );
        });
        newUpdated = updated;
      }
      if (role === "employee") {
        let updated = newUpdated?.filter((m: masterCatType) => {
          return m.name !== "Moderation";
        });
        newUpdated = updated;
      }
      let indexes: any = [];
      let f = false;

      newUpdated.map((m: masterCatType, index: number) => {
        m.subCategory.map((s: any) => {
          if (s.active === true) f = true;
        });
        console.log(f);
        if (!f) {
          if (m.subCategory.length === 0) {
            indexes.push(index);
          }
        }
      });

      if (f) {
        newUpdated.map((m: masterCatType) => {
          m.selected = false;
          return m;
        });
      }

      if (indexes.length && !f) {
        newUpdated[indexes[0]].selected = true;
        newUpdated[indexes[0]].active = true;
      }
      console.log(newUpdated);
      setmastercategory(newUpdated);
    }
    setLoadingChecks(false);
  };

  useEffect(() => {
    if (data) setRole(data.getInternalUser.accessRole.role);
    if (role) {
      filterCategories();
    }
  }, [data, role]);

  return (
    <div className={leftSideBarStyles.sideBarWrapper}>
      <div className={leftSideBarStyles.buttonsWrapper}>
        <button className={leftSideBarStyles.dashBoard}>
          <FaTachometerAlt style={{ marginTop: "-0.25rem" }} />
          <span style={{ paddingLeft: ".5rem" }}> &nbsp;Dashboard</span>
        </button>

        {!loadingChecks &&
          mastercategory?.map((mc: masterCatType, mindex: number) => {
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
