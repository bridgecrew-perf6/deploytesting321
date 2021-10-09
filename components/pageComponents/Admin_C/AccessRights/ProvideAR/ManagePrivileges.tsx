import React from "react";
import { Model, OnlyIconButton } from "_components/pageComponents";
import usersInfoBox from "../../../../../appStyles/adminStyles/usersInfoBox.module.css";
import { RiAddFill, RiSubtractFill, RiBallPenFill } from "react-icons/ri";
import { ToolTipCtr } from "_components/layout/customComps";

const ManagePrivileges = (props: any) => {
  const {
    managePrivModal,
    setManagePrivModal,
    handleCloseRoleModal,
    setCreatePrivilegeModal,
    actionOnPrivlige,
    setActionOnPrivilege,
  } = props;
  return (
    <Model
      show={managePrivModal}
      size="md"
      modalTitle={"Manage Privileges"}
      handleClose={handleCloseRoleModal}
      height={"3rem"}
      width={"10rem"}
      footer={false}
    >
      <h5 style={{ marginBottom: "1rem" }}>Choose an action to continue</h5>
      <div className={usersInfoBox.managePrivilegesIconsWrapper}>
        <ToolTipCtr
          mssg="Add New Privilege"
          position="top"
          style={{ bottom: "4rem", left: "50%" }}
        >
          <div className="d-flex align-items-center mr-1">
            <button
              type="button"
              onClick={() => {
                setActionOnPrivilege("Add");
                setCreatePrivilegeModal(true);
              }}
              style={{ width: "3rem", height: "2.5rem", margin: "10px" }}
              className={usersInfoBox.onlyIconButton}
            >
              <RiAddFill size={25} />
            </button>
          </div>
        </ToolTipCtr>

        <ToolTipCtr
          mssg="Remove Privileges"
          position="top"
          style={{ bottom: "4rem", left: "50%" }}
        >
          <button
            onClick={() => {
              setActionOnPrivilege("Remove");
              setCreatePrivilegeModal(true);
            }}
            style={{ width: "3rem", height: "2.5rem", margin: "10px" }}
            type="button"
            className={usersInfoBox.onlyIconButton}
          >
            <RiSubtractFill size={25} />
          </button>
        </ToolTipCtr>

        <ToolTipCtr
          mssg="Edit Privileges"
          position="top"
          style={{ bottom: "4rem", left: "50%" }}
        >
          <button
            type="button"
            onClick={() => {
              setActionOnPrivilege("Edit");
              setCreatePrivilegeModal(true);
            }}
            style={{ width: "3rem", height: "2.5rem", margin: "10px" }}
            className={usersInfoBox.onlyIconButton}
            data-toggle="tooltip"
            data-placement="top"
            title="Edit Privileges"
          >
            <RiBallPenFill size={22} />
          </button>
        </ToolTipCtr>
      </div>
    </Model>
  );
};

export default ManagePrivileges;
