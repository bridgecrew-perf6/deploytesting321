import React from "react";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const OnlyIconButton = (props: any) => {
  const { width, height, onClick, icon, margin } = props;
  return (
    <button
      onClick={onClick}
      style={{ width: width, height: height, margin: margin }}
      className={usersInfoBox.onlyIconButton}
    >
      {icon}
    </button>
  );
};

export default OnlyIconButton;
