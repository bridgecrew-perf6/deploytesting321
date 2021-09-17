import React, { useState } from "react";
// import usersInfoBox from "_appStyles/adminStyles/usersInfoBox.module.css";
import usersInfoBox from "../../../appStyles/adminStyles/usersInfoBox.module.css";
import btnStyles from "../../../appStyles/btnStyles.module.css";
import BootstrapTable from "react-bootstrap-table-next";

import {
  AdminButton,
  Table,
  UsersDataFormInput,
  AdminPara,
} from "_pageComponents/index";
import { worker } from "cluster";

const UsersInfo = () => {
  const handleButtonClick = (index: number) => {
    const updatedActive = activeButton.map((ab) => {
      if (ab.id === index) {
        if (ab.isActive === "false") {
          ab.isActive = "true";
        }
      } else {
        ab.isActive = "false";
      }
      return ab;
    });
    setActiveButton(updatedActive);
  };
  const { customBtnOutline, custombtnCreate } = btnStyles;
  const [modifyingTableRowNo, setModifyingTableRowNo] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [activeButton, setActiveButton] = useState([
    {
      id: 0,
      isActive: "true",
      title: "Active",
    },
    {
      id: 1,
      isActive: "false",
      title: "Disabled",
    },
    {
      id: 2,
      isActive: "false",
      title: "Add new user",
    },
  ]);

  const [columnData, setColumnData] = useState({
    columns: [
      {
        dataField: "id",
        text: "Id",
      },
      {
        dataField: "fullName",
        text: "Full Name",
      },
      {
        dataField: "email",
        text: "Email Address",
      },
      {
        dataField: "accessRole",
        text: "Access Role",
      },
      {
        dataField: "jobTitle",
        text: "Job Type",
      },
    ],
  });

  const [usersData, setUsersData] = useState([
    {
      id: 1,
      fullName: "hasssaan",
      email: "",
      accessRole: "",
      jobTitle: "",
    },
    {
      id: 2,
      fullName: "",
      email: "",
      accessRole: "",
      jobTitle: "",
    },
    {
      id: 3,
      fullName: "",
      email: "",
      accessRole: "",
      jobTitle: "",
    },
    {
      id: 4,
      fullName: "",
      email: "",
      accessRole: "",
      jobTitle: "",
    },
  ]);

  const [userDataForm, setUserDataForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
    jobTitle: "",
    accessRole: "",
    groups: "",
    lastSignIn: "",
  });

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (modifyingTableRowNo > 0) {
      setUserDataForm({
        ...userDataForm,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  };

  const changeTableRowData = (row: any, rowIndex: number) => {
    setShowForm(true);

    setModifyingTableRowNo(row.id);
    setUserDataForm({
      ...userDataForm,
      fullName: row.fullName,
      email: row.email,
      jobTitle: row.jobTitle,
      accessRole: row.accessRole,
    });
  };

  const handleSubmitUsersData = (e: any) => {
    e.preventDefault();
    const updatedData = usersData.map((data) => {
      if (modifyingTableRowNo === data.id) {
        console.log(modifyingTableRowNo, data.id);
        return {
          ...data,
          fullName: userDataForm.fullName,
          email: userDataForm.email,
          jobTitle: userDataForm.jobTitle,
          accessRole: userDataForm.accessRole,
        };
      }
      return data;
    });
    console.log(updatedData);
    setUsersData(updatedData);
  };

  const showActiveUsersData = () => (
    <div className={usersInfoBox.userInfoBox__adminTableWrapper}>
      <Table
        usersdata={usersData}
        columndata={columnData}
        changetablerowdata={changeTableRowData}
      />
    </div>
  );

  return (
    <div className={usersInfoBox.usersInfoWrapper}>
      <div className={usersInfoBox.userInfoBox__btnWrapper}>
        {activeButton.map((btn, index) => (
          <AdminButton
            key={index}
            isactive={btn.isActive}
            onClick={() => handleButtonClick(index)}
            title={btn.title}
          />
        ))}
      </div>

      {activeButton[0].isActive === "true" ? (
        showActiveUsersData()
      ) : activeButton[1].isActive === "true" ? (
        <h2>Disabled Users</h2>
      ) : activeButton[2].isActive === "true" ? (
        <h2>Adding New User</h2>
      ) : null}

      {activeButton[0].isActive === "true"
        ? showForm && (
            <form onSubmit={handleSubmitUsersData}>
              <div className={usersInfoBox.userInfoBox__inputWrapper}>
                <h4 style={{ marginBottom: "1rem" }}>Enter User Infomation</h4>
                <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                  <AdminPara text="Full Name" />
                  <UsersDataFormInput
                    type="text"
                    required
                    name="fullName"
                    value={userDataForm.fullName}
                    onChange={(e: any) => onChangeInput(e)}
                  />
                </div>
                <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                  <AdminPara text="E-mail" />
                  <UsersDataFormInput
                    type="email"
                    required
                    name="email"
                    value={userDataForm.email}
                    onChange={(e: any) => onChangeInput(e)}
                  />
                </div>
                <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                  <AdminPara text="Phone Number" />
                  <UsersDataFormInput
                    type="text"
                    required
                    name="phoneNumber"
                    value={userDataForm.phoneNumber}
                    onChange={(e: any) => onChangeInput(e)}
                  />
                </div>
                <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                  <AdminPara text="Home Address" />
                  <UsersDataFormInput
                    type="text"
                    required
                    value={userDataForm.homeAddress}
                    name="homeAddress"
                    onChange={(e: any) => onChangeInput(e)}
                  />
                </div>
                <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                  <AdminPara text="Job Title" />
                  <UsersDataFormInput
                    type="text"
                    required
                    value={userDataForm.jobTitle}
                    name="jobTitle"
                    onChange={(e: any) => onChangeInput(e)}
                  />
                </div>
                <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                  <AdminPara text="Access-Role" />
                  <UsersDataFormInput
                    type="text"
                    name="accessRole"
                    value={userDataForm.accessRole}
                    required
                    onChange={(e: any) => onChangeInput(e)}
                  />
                </div>
                <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                  <AdminPara text="Groups" />
                  <UsersDataFormInput
                    type="text"
                    name="groups"
                    value={userDataForm.groups}
                    required
                    onChange={(e: any) => onChangeInput(e)}
                  />
                </div>
                <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                  <AdminPara text="Last Sign-in" />
                  <UsersDataFormInput
                    type="text"
                    required
                    value={userDataForm.lastSignIn}
                    name="lastSignIn"
                    onChange={(e: any) => onChangeInput(e)}
                  />
                </div>
                <button
                  className={usersInfoBox.userInfoBox__btnSubmitForm}
                  type="submit"
                >
                  Save User info
                </button>
              </div>
            </form>
          )
        : null}
    </div>
  );
};

export default UsersInfo;
