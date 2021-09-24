import React, { useState } from "react";
import leftSideBarStyles from "../../../../appStyles/adminStyles/leftSideBarStyles.module.css";

const LeftSideSubBar = (props: any) => {
  const { item, handleOpenMaster, handleOpenSub } = props;
  const [showSubNav, setShowSubNav] = useState(false);

  return (
    <>
      <button
        onClick={() => handleOpenMaster(item)}
        className={
          item?.active && item?.selected
            ? leftSideBarStyles.buttonsWrapper__masterButtonsSelected
            : item?.active
            ? leftSideBarStyles.buttonsWrapper__masterButtonsActive
            : leftSideBarStyles.buttonsWrapper__masterButtons
        }
      >
        &nbsp; {item.icon}
        <span style={{ paddingLeft: ".5rem" }}>&nbsp;{item?.name}</span>
      </button>

      {item.subCategory
        ? item.subCategory.map((itemSub: any, sIndex: any) => {
            return (
              <div
                key={sIndex}
                onClick={() => handleOpenSub(itemSub)}
                className={
                  item.active
                    ? leftSideBarStyles.buttonsWrapper__showSubCats
                    : leftSideBarStyles.buttonsWrapper__isNotShowSubCats
                }
              >
                <button
                  className={
                    itemSub?.active
                      ? leftSideBarStyles.buttonsWrapper__subButtonActive
                      : leftSideBarStyles.buttonsWrapper__subButtons
                  }
                >
                  {itemSub.icon}
                  <span style={{ paddingLeft: ".5rem" }}>
                    &nbsp;{itemSub?.name}
                  </span>
                </button>
              </div>
            );
          })
        : null}
    </>
  );
};

export default LeftSideSubBar;
