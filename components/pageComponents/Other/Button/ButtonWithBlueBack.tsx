import React from "react";
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
      {loading ? (
        <div className="spinner-grow text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        title
      )}
    </button>
  );
};

export default ButtonWithBlueBack;
// 345995;
