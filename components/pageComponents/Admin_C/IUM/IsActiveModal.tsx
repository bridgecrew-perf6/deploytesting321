import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Model } from "_pageComponents/index";

const IsActiveModal = (props: any) => {
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
                <Spinner animation="grow" variant="secondary" />
              ) : (
                "Activate"
              )
            ) : loadingb ? (
              <Spinner animation="grow" variant="secondary" />
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
