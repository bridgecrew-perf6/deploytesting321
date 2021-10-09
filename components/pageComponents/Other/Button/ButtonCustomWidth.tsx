import React from "react";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const ButtonCustomWidth = (props: any) => {
  const { width, height, onClick, title, type, disabled, loading } = props;
  return (
    <button
      style={{ width: width, height: height }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={usersInfoBox.buttonCustomWIdth}
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

export default ButtonCustomWidth;
