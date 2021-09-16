import React, { useState } from "react";
// import usersInfoBox from "_appStyles/adminStyles/usersInfoBox.module.css";
import usersInfoBox from "../../../appStyles/adminStyles/usersInfoBox.module.css";
import btnStyles from "../../../appStyles/btnStyles.module.css";

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
        dataField: "phoneNumber",
        text: "Phone number",
      },
      {
        dataField: "homeAddress",
        text: "Home address",
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
      fullName: "",
      email: "",
      phoneNumber: "",
      homeAddress: "",
      jobTitle: "",
      accessRole: "",
      groups: "",
      lastSignIn: "",
    },
    {
      id: 2,
      fullName: "",
      email: "",
      phoneNumber: "",
      homeAddress: "",
      jobTitle: "",
      accessRole: "",
      groups: "",
      lastSignIn: "",
    },
    {
      id: 3,
      fullName: "",
      email: "",
      phoneNumber: "",
      homeAddress: "",
      jobTitle: "",
      accessRole: "",
      groups: "",
      lastSignIn: "",
    },
    {
      id: 4,
      fullName: "",
      email: "",
      phoneNumber: "",
      homeAddress: "",
      jobTitle: "",
      accessRole: "",
      groups: "",
      lastSignIn: "",
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

  const showActiveUsersData = () => (
    <div className={usersInfoBox.userInfoBox__adminTableWrapper}>
      <Table
        usersdata={usersData}
        columndata={columnData}
        changetablerowdata={changeTableRowData}
      />
    </div>
  );

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (modifyingTableRowNo > 0) {
      setUserDataForm({
        ...userDataForm,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  };

  console.log(modifyingTableRowNo);

  const changeTableRowData = (row: any, rowIndex: number) => {
    console.log(row);
    setShowForm(true);

    console.log("I am here");
    setModifyingTableRowNo(row.id);
    setUserDataForm({
      fullName: row.fullName,
      email: row.email,
      phoneNumber: row.phoneNumber,
      homeAddress: row.homeAddress,
      jobTitle: row.jobTitle,
      accessRole: row.accessRole,
      groups: "",
      lastSignIn: "",
    });
  };

  console.log(userDataForm);

  const handleSubmitUsersData = () => {
    console.log("Submiting data");
    console.log(modifyingTableRowNo);
    console.log(userDataForm);
    let newArray = [...usersData];
    newArray[modifyingTableRowNo - 1].fullName = userDataForm.fullName;
    newArray[modifyingTableRowNo - 1].email = userDataForm.email;
    newArray[modifyingTableRowNo - 1].homeAddress = userDataForm.homeAddress;
    newArray[modifyingTableRowNo - 1].phoneNumber = userDataForm.phoneNumber;
    newArray[modifyingTableRowNo - 1].jobTitle = userDataForm.jobTitle;
    newArray[modifyingTableRowNo - 1].accessRole = userDataForm.accessRole;
    setUsersData(newArray);
  };

  // console.log(usersData);

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
            <div className={usersInfoBox.userInfoBox__inputWrapper}>
              <h4 style={{ marginBottom: "1rem" }}>Enter User Infomation</h4>
              <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                <AdminPara text="Full Name" />
                <UsersDataFormInput
                  type="text"
                  required
                  name="fullName"
                  onChange={(e: any) => onChangeInput(e)}
                />
              </div>
              <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                <AdminPara text="E-mail" />
                <UsersDataFormInput
                  type="email"
                  required
                  name="email"
                  onChange={(e: any) => onChangeInput(e)}
                />
              </div>
              <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                <AdminPara text="Phone Number" />
                <UsersDataFormInput
                  type="text"
                  required
                  name="phoneNumber"
                  onChange={(e: any) => onChangeInput(e)}
                />
              </div>
              <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                <AdminPara text="Home Address" />
                <UsersDataFormInput
                  type="text"
                  required
                  name="homeAddress"
                  onChange={(e: any) => onChangeInput(e)}
                />
              </div>
              <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                <AdminPara text="Job Title" />
                <UsersDataFormInput
                  type="text"
                  required
                  name="jobTitle"
                  onChange={(e: any) => onChangeInput(e)}
                />
              </div>
              <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                <AdminPara text="Access-Role" />
                <UsersDataFormInput
                  type="text"
                  name="accessRole"
                  required
                  onChange={(e: any) => onChangeInput(e)}
                />
              </div>
              <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                <AdminPara text="Groups" />
                <UsersDataFormInput
                  type="text"
                  name="groups"
                  required
                  onChange={(e: any) => onChangeInput(e)}
                />
              </div>
              <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
                <AdminPara text="Last Sign-in" />
                <UsersDataFormInput
                  type="text"
                  required
                  name="lastSignIn"
                  onChange={(e: any) => onChangeInput(e)}
                />
              </div>
              <button
                className={usersInfoBox.userInfoBox__btnSubmitForm}
                onClick={handleSubmitUsersData}
              >
                Save User info
              </button>
            </div>
          )
        : null}
    </div>
  );
};

export default UsersInfo;
