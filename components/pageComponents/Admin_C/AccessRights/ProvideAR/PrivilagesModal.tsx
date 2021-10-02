import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { AdminPara, Model } from "_pageComponents/index";
import userRightsStyles from "../../../../../appStyles/adminStyles/userRightsStyles.module.css";

const PrivilagesModal = (props: any) => {
  const {
    showPrivModal,
    setShowPrivModal,
    handleUpdatePrivilages,
    handleCloseRoleModal,
    selectedRole,
    loadingD,
    privilagesData,
    setPrivilagesData,
    selectedRoleValue,
  } = props;

  let rolesForEmployee = [
    "Create a poll",
    "Closing a poll",
    "Manage users",
    "Create new topic",
    "Create a subtopic",
    "Approve new subtopics",
  ];

  let rolesForModerator = [
    "Hide a poll",
    "Edit user access",
    "Delete photos",
    "Flag polls",
    "Hide answers",
    "Hide chat message",
  ];

  const handleCheckbox = (p: any) => {
    let up;
    up = privilagesData.map((pd: any, index: number) => {
      if (pd.name === p.name) {
        if (pd.active === true) {
          return { name: pd.name, active: false };
        } else {
          return { name: pd.name, active: true };
        }
      }
      return pd;
    });
    setPrivilagesData(up);
  };

  return (
    <Model
      show={showPrivModal}
      size="md"
      modalTitle="Update Roles"
      handleClose={handleCloseRoleModal}
      height={"3rem"}
      width={"10rem"}
      buttons={[
        {
          label: "Cancel",
          color: "danger",
          onClick: () => {
            setShowPrivModal(false);
          },
        },
        {
          color: "warning",
          label: loadingD ? (
            <Spinner animation="grow" variant="secondary" />
          ) : (
            "Update Privilages"
          ),
          onClick: handleUpdatePrivilages,
        },
      ]}
    >
      <h5>Which privilages would u like to select for "{selectedRole}"?</h5>
      <div className={userRightsStyles.privilagesWrapper}>
        {privilagesData?.map((p: any, index: number) => {
          return (
            <div style={{ marginTop: -10 }} key={index}>
              <div className={userRightsStyles.singlePrivilage}>
                <AdminPara text={p.name} />
                <input
                  type="checkbox"
                  checked={p.active}
                  value={p.name}
                  onChange={() => handleCheckbox(p)}
                  className={userRightsStyles.privilagesCheckBoxes}
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </Model>
  );
};

export default PrivilagesModal;
