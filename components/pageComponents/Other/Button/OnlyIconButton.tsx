import React from "react";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const OnlyIconButton = (props: any) => {
  const { width, height, onClick, icon, margin, title2 } = props;
  return (
    <button
      onClick={onClick}
      style={{ width: width, height: height, margin: margin }}
      className={usersInfoBox.onlyIconButton}
      data-toggle="tooltip"
      data-placement="top"
      title={
        title2 === "Add"
          ? "Add a Privilege"
          : title2 === "Remove"
          ? "Remove Privileges"
          : title2 === "Edit"
          ? "Edit Privileges"
          : ""
      }
    >
      {icon}
    </button>
  );
};

export default OnlyIconButton;
