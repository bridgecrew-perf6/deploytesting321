import React from "react";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const TextAreaSimple = (props: any) => {
  return (
    <textarea
      className={usersInfoBox.userInfoBox__textArea}
      name={props.name}
      required
      cols={props.cols}
      rows={props.cols}
      onChange={props.onChange}
      value={props.value}
    >
      {props.description}
    </textarea>
  );
};

export default TextAreaSimple;
