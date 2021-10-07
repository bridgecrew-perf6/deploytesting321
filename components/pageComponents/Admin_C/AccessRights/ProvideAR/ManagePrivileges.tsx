import React from "react";
import { Model, OnlyIconButton } from "_components/pageComponents";
import usersInfoBox from "../../../../../appStyles/adminStyles/usersInfoBox.module.css";
import { RiAddFill, RiSubtractFill, RiBallPenFill } from "react-icons/ri";

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
        <OnlyIconButton
          width="3rem"
          height="2.5rem"
          margin="10px"
          icon={<RiAddFill size={25} />}
          onClick={() => {
            setActionOnPrivilege("Add");
            setCreatePrivilegeModal(true);
          }}
        />
        <OnlyIconButton
          width="3rem"
          height="2.5rem"
          margin="10px"
          icon={<RiSubtractFill size={25} />}
          onClick={() => {
            setActionOnPrivilege("Remove");
            setCreatePrivilegeModal(true);
          }}
        />
        <OnlyIconButton
          width="3rem"
          height="2.5rem"
          margin="10px"
          icon={<RiBallPenFill size={22} />}
          onClick={() => {
            setActionOnPrivilege("Edit");
            setCreatePrivilegeModal(true);
          }}
        />
      </div>
    </Model>
  );
};

export default ManagePrivileges;
