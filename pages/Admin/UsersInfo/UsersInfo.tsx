import React, { useState } from "react";
import usersInfoBox from "../../../appStyles/adminStyles/usersInfoBox.module.css";
import AdminButtons from "../../../components/pageComponents/Admin_C/AdminButton";
import Table from "../../../components/pageComponents/Other/Table/Table";

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
                dataField: "role",
                text: "Access Role",
            },
            {
                dataField: "jobType",
                text: "Job Type",
            },
        ],
    });

    const [usersData, setUsersData] = useState([
        {
            id: 1,
            fullName: "user_1",
            email: "geeky@gmial.com",
            role: "",
            jobType: "",
        },
        { id: 2, fullName: "user_2", email: "", role: "", jobType: "" },
        { id: 3, fullName: "user_3", email: "", role: "", jobType: "" },
        { id: 4, fullName: "user_4", email: "", role: "", jobType: "" },
    ]);

    const showActiveUsersData = () => (
        <div className={usersInfoBox.userInfoBox__adminTableWrapper}>
            <Table usersdata={usersData} columndata={columnData} />
        </div>
    );

    return (
        <div className={usersInfoBox.usersInfoWrapper}>
            <div className={usersInfoBox.userInfoBox__btnWrapper}>
                {activeButton.map((btn, index) => (
                    <AdminButtons
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
        </div>
    );
};

export default UsersInfo;
