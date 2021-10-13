import React, { useEffect, useState } from "react";
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
      footer={true}
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
                <div className="spinner-grow text-secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Activate"
              )
            ) : loadingB ? (
              <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
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
