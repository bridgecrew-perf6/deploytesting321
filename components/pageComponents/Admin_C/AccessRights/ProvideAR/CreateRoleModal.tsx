import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import {
  AdminPara,
  ButtonCustomWidth,
  Model,
  TextAreaSimple,
  UsersDataFormInput,
} from "_pageComponents/index";
import usersInfoBox from "../../../../../appStyles/adminStyles/usersInfoBox.module.css";

const CreateRoleModal = (props: any) => {
  const {
    showCreateRoleModal,
    setShowCreateRoleModal,
    handleCreateNewRole,
    handleCloseRoleModal,
    selectedRole,
    roleData,
    setRoleData,
    loadingC,
  } = props;

  return (
    <Model
      show={showCreateRoleModal}
      size="md"
      modalTitle={"Create Role"}
      handleClose={handleCloseRoleModal}
      height={"3rem"}
      width={"10rem"}
    >
      <h4 style={{ marginBottom: "1rem" }}>Create new role</h4>
      <form onSubmit={handleCreateNewRole}>
        <div className={usersInfoBox.userInfoBox__inputWrapper}>
          <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
            <AdminPara text="Role" />
            <UsersDataFormInput
              type="text"
              required={true}
              name="role"
              value={roleData.role}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRoleData({
                  ...roleData,
                  role: e.currentTarget.value,
                });
              }}
            />
          </div>
          <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
            <AdminPara text="Description" />
            <TextAreaSimple
              required
              name="description"
              cols={10}
              rows={5}
              value={roleData.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRoleData({ ...roleData, description: e.target.value });
              }}
            />
          </div>

          <div className={usersInfoBox.modalButtonsWrapper}>
            <ButtonCustomWidth
              type="text"
              width={"9rem"}
              height={"2.5rem"}
              title="Cancel"
              onClick={() => setShowCreateRoleModal(false)}
            />
            <ButtonCustomWidth
              width={"9rem"}
              height={"2.5rem"}
              type="submit"
              disabled={loadingC ? true : false}
              title={loadingC ? "Loading..." : "Save User info"}
              onClick={() => "f"}
            />
          </div>
        </div>
      </form>
    </Model>
  );
};

export default CreateRoleModal;
