import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Model } from "_pageComponents/index";

const RoleActionModal = (props: any) => {
  const {
    showRoleActionModal,
    setShowRoleActionModal,
    disableRoleFunction,
    activateRoleFunction,
    handleCloseRoleModal,
    roleLabelOnModal,
    loadingA,
    loadingB,
    setRoleLabelOnModal,
  } = props;

  return (
    <Model
      show={showRoleActionModal}
      size="md"
      children={
        roleLabelOnModal === "Activate"
          ? "Activate selected Role ?"
          : "Are you sure you want to disable selected role ?"
      }
      modalTitle={"Caution!"}
      handleClose={handleCloseRoleModal}
      height={"3rem"}
      width={"8rem"}
      buttons={[
        {
          label: "Cancel",
          color: "danger",
          onClick: () => {
            setShowRoleActionModal(false);
          },
        },
        {
          color: "warning",
          label:
            roleLabelOnModal === "Activate" ? (
              loadingA ? (
                <Spinner animation="grow" variant="secondary" />
              ) : (
                "Activate"
              )
            ) : loadingB ? (
              <Spinner animation="grow" variant="secondary" />
            ) : (
              "Disable"
            ),
          onClick:
            roleLabelOnModal === "Activate"
              ? activateRoleFunction
              : disableRoleFunction,
        },
      ]}
    ></Model>
  );
};

export default RoleActionModal;
