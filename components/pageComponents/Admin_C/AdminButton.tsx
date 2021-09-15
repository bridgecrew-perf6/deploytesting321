import React from "react";
import usersInfoBox from "../../../appStyles/adminStyles/usersInfoBox.module.css";

const AdminButtons = (props: any) => {
    const { isactive } = props;
    return (
        <button {...props}
            className={
                isactive === "false"
                    ? usersInfoBox.users_btnWrapper__btn
                    : usersInfoBox.users_btnWrapper__btnActive
            }
        >
            {props.title}
        </button>
    );
};

export default AdminButtons;
