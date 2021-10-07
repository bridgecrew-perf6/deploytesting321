import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { AdminPara, Model } from "_pageComponents/index";
import userRightsStyles from "../../../../../appStyles/adminStyles/userRightsStyles.module.css";

const ManageUserPrivileges = (props: any) => {
  const {
    showPrivModal,
    setShowPrivModal,
    handleUpdatePrivilages,
    handleCloseRoleModal,
    selectedRole,
    loadingD,
    allPrivileges,
    setAllPrivileges,
    selectedRoleValue,
  } = props;

  const handleCheckbox = (p: any) => {
    let up;
    console.log(p);
    up = allPrivileges.map((pd: any, index: number) => {
      if (pd.privilegeName === p.privilegeName) {
        if (pd.privilegeStatus === true) {
          console.log("found");
          return {
            ...pd,
            privilegeName: pd.privilegeName,
            privilegeStatus: false,
          };
        } else {
          return {
            ...pd,
            privilegeName: pd.privilegeName,
            privilegeStatus: true,
          };
        }
      }
      return pd;
    });
    console.log(up);
    setAllPrivileges(up);
  };

  return (
    <Model
      show={showPrivModal}
      size="md"
      modalTitle="Update Roles"
      handleClose={handleCloseRoleModal}
      height={"3rem"}
      width={"10rem"}
      footer={true}
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
            "Update Privileges"
          ),
          onClick: handleUpdatePrivilages,
        },
      ]}
    >
      <h5>Which privilages would u like to select for "{selectedRole}"?</h5>
      {allPrivileges.length === 0 ? (
        <h6>Loading...</h6>
      ) : (
        <div className={userRightsStyles.privilagesWrapper}>
          {allPrivileges?.map((p: any, index: number) => {
            return (
              <div style={{ marginTop: -10 }} key={index}>
                <div className={userRightsStyles.singlePrivilage}>
                  <AdminPara text={p.privilegeName} />
                  <input
                    type="checkbox"
                    checked={p.privilegeStatus}
                    value={p.privilegeName}
                    onChange={() => handleCheckbox(p)}
                    className={userRightsStyles.privilagesCheckBoxes}
                  />
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </Model>
  );
};

export default ManageUserPrivileges;
