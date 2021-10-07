import React from "react";
import { Spinner } from "react-bootstrap";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const ButtonWithBlueBack = (props: any) => {
  const { width, height, onClick, title, type, disabled, margin, loading } =
    props;
  return (
    <button
      style={{ width: width, height: height, margin: margin }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={usersInfoBox.buttonWithBlueBack}
    >
      {loading ? <Spinner animation="grow" variant="secondary" /> : title}
    </button>
  );
};

export default ButtonWithBlueBack;
// 345995;
