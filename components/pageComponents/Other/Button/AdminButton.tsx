import React from "react";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const AdminButton = (props: any) => {
  const { module } = props;
  return (
    <button
      {...props}
      style={props.style}
      className={
        module === "menuTitle"
          ? usersInfoBox.userInfoBox__titleButton
          : usersInfoBox.users_btnWrapper__btnActive
      }
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

export default AdminButton;
