import React, { useEffect, useState } from "react";
import { Model } from "_pageComponents/index";

const IsActiveModal: React.FC<{
  showActiveModal?: boolean;
  setShowActiveModal: Function;
  handleCloseIsActiveModal: Function;
  showActiveModalLabel?: string;
  updateUsersToActive: Function;
  updateUsersToDisable: Function;
  loadingb?: boolean;
  loadingc?: boolean;
}> = (props) => {
  const {
    showActiveModal,
    setShowActiveModal,
    handleCloseIsActiveModal,
    showActiveModalLabel,
    updateUsersToActive,
    updateUsersToDisable,
    loadingb,
    loadingc,
  } = props;
  return (
    <Model
      show={showActiveModal}
      size="md"
      children={showActiveModalLabel}
      modalTitle={"Caution!"}
      handleClose={handleCloseIsActiveModal}
      height={"3rem"}
      footer={true}
      width={"8rem"}
      buttons={[
        {
          label: "Cancel",
          color: "danger",
          onClick: () => {
            setShowActiveModal(false);
          },
        },
        {
          color: "warning",
          label:
            showActiveModalLabel ===
            "Are you sure to Activate selected Users ?" ? (
              loadingc ? (
                <div className="spinner-grow text-secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Activate"
              )
            ) : loadingb ? (
              <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Disable"
            ),
          onClick:
            showActiveModalLabel === "Are you sure to Activate selected Users ?"
              ? updateUsersToActive
              : updateUsersToDisable,
        },
      ]}
    ></Model>
  );
};

export default IsActiveModal;
