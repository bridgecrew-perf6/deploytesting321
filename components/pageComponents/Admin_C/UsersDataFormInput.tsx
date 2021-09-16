import React from "react";
import usersInfoBox from "../../../appStyles/adminStyles/usersInfoBox.module.css";

const UsersDataFormInput = (props: any) => {
  return (
    <input
      className={usersInfoBox.userInfoBox__input}
      {...props}
      type={props.type}
      id={props.id}
      required
      name={props.name}
    />
  );
};

export default UsersDataFormInput;
