import React, { useEffect, useState } from "react";
import { AdminPara, ButtonCustomWidth, Model } from "_pageComponents/index";
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
    up = allPrivileges.map((pd: any, index: number) => {
      if (pd.privilegeName === p.privilegeName) {
        if (pd.privilegeStatus === true) {
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
    setAllPrivileges(up);
  };

  const handleSelectDeselectAll = () => {
    let up;
    up = allPrivileges.map((pd: any, index: number) => {
      return {
        ...pd,
        privilegeStatus: !pd.privilegeStatus,
      };
    });
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
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Update Privileges"
          ),
          onClick: handleUpdatePrivilages,
        },
      ]}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h5>Which privilages would u like to select for "{selectedRole}"?</h5>
        <ButtonCustomWidth
          width="14rem"
          height="3rem"
          title="Select/Unselect All"
          onClick={handleSelectDeselectAll}
        />
      </div>
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
