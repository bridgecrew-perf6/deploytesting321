import React from "react";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const ButtonCustomWidth = (props: any) => {
  const { width, height, onClick, title, type, disabled } = props;
  return (
    <button
      style={{ width: width, height: height }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={usersInfoBox.buttonCustomWIdth}
    >
      {title}
    </button>
  );
};

export default ButtonCustomWidth;
