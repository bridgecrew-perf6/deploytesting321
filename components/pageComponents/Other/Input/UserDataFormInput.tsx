import React from "react";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const UsersDataFormInput = (props: any) => {
  const { validationerrors, value, type, required, name } = props;
  let emailError = validationerrors?.emailErr;
  return (
    <input
      className={usersInfoBox.userInfoBox__input}
      style={{ border: emailError && "2px solid #DC3545" }}
      {...props}
      value={value}
      type={type}
      required={required}
      name={name}
      onChange={props.onChange}
    />
  );
};

export default UsersDataFormInput;
