import React from "react";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const ButtonCustomWidth = (props: any) => {
  return (
    <button
      style={{ width: props.width, height: props.height }}
      onClick={props.onClick}
      className={usersInfoBox.buttonCustomWIdth}
    >
      {props.title}
    </button>
  );
};

export default ButtonCustomWidth;
