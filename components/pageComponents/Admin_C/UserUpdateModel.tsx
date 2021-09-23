import React, { useEffect, useState } from "react";
import {
  Model,
  SelectMenu,
  AdminPara,
  UsersDataFormInput,
  SelectMenuActive,
} from "..";
import usersInfoBox from "../../../appStyles/adminStyles/usersInfoBox.module.css";

const UserUpdateModel = (props: any) => {
  const {
    showUserEditModal,
    setShowUserEditModal,
    handleCLoseModal,
    handleSubmitUsersData,
    userDataForm,
    setUserDataForm,
  } = props;

  const accessRoles = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "employee",
      label: "Employee",
    },
    {
      value: "moderator",
      label: "Moderator",
    },
  ];

  const isActive = [
    {
      value: true,
      label: "true",
    },
    {
      value: false,
      label: "false",
    },
  ];

  return (
    <Model
      show={showUserEditModal}
      size="md"
      modalTitle={"Update User Info"}
      handleClose={handleCLoseModal}
      buttons={[
        {
          label: "Cancel",
          color: "danger",
          onClick: () => {
            setShowUserEditModal(false);
          },
        },
        {
          color: "success",
          label: "Save Changes",
          onClick: handleSubmitUsersData,
        },
      ]}
    >
      <form onSubmit={handleSubmitUsersData}>
        <div className={usersInfoBox.userInfoBox__inputWrapper}>
          <h5 style={{ marginBottom: "1rem" }}>User update Form</h5>
          <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
            <AdminPara text="Full Name" />
            <UsersDataFormInput
              type="text"
              required
              name="fullName"
              value={userDataForm.fullName}
              onChange={(e: any) => {
                setUserDataForm({ ...userDataForm, fullName: e.target.value });
              }}
            />
          </div>
          <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
            <AdminPara text="E-mail" />
            <UsersDataFormInput
              type="email"
              required
              name="email"
              value={userDataForm.email}
              onChange={(e: any) => {
                setUserDataForm({ ...userDataForm, email: e.target.value });
              }}
            />
          </div>
          <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
            <AdminPara text="Phone Number" />
            <UsersDataFormInput
              type="text"
              required
              name="phoneNumber"
              value={userDataForm.phoneNumber}
              onChange={(e: any) => {
                setUserDataForm({
                  ...userDataForm,
                  phoneNumber: e.target.value,
                });
              }}
            />
          </div>
          <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
            <AdminPara text="Home Address" />
            <UsersDataFormInput
              type="text"
              required
              value={userDataForm.homeAddress}
              name="homeAddress"
              onChange={(e: any) => {
                setUserDataForm({
                  ...userDataForm,
                  homeAddress: e.target.value,
                });
              }}
            />
          </div>
          <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
            <AdminPara text="Job Title" />
            <UsersDataFormInput
              type="text"
              required
              value={userDataForm.jobTitle}
              name="jobTitle"
              onChange={(e: any) => {
                setUserDataForm({ ...userDataForm, jobTitle: e.target.value });
              }}
            />
          </div>
          <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
            <AdminPara text="Access-Role" />
            <SelectMenu
              options={accessRoles}
              selectedValue={userDataForm.accessRole}
              userDataForm={userDataForm}
              setUserDataForm={setUserDataForm}
            />
          </div>

          <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
            <AdminPara text="isActive" />
            <SelectMenuActive
              activeOptions={isActive}
              selectedValue={userDataForm.isActive || false}
              userDataForm={userDataForm}
              setUserDataForm={setUserDataForm}
            />
          </div>
          <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
            <AdminPara text="Groups" />
            <UsersDataFormInput
              type="text"
              name="groups"
              value={userDataForm.groups}
              required
              onChange={(e: any) => {
                setUserDataForm({ ...userDataForm, groups: e.target.value });
              }}
            />
          </div>
          <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
            <AdminPara text="Last Sign-in" />
            <UsersDataFormInput
              type="text"
              required
              value={userDataForm.lastSignIn}
              name="lastSignIn"
              onChange={(e: any) => {
                setUserDataForm({
                  ...userDataForm,
                  lastSignIn: e.target.value,
                });
              }}
            />
          </div>
          {/* <button
                    className={usersInfoBox.userInfoBox__btnSubmitForm}
                    type="submit"
                  >
                    Save User info
                  </button> */}
        </div>
      </form>
    </Model>
  );
};

export default UserUpdateModel;
