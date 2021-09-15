import React, { useState } from "react";
import { AdminLeftSideBarCategoryItems } from "../../components/appTypes/appType";
import { SitePageContainer } from "../../components/layout";
import LeftSideBar from "../../components/pageComponents/Admin_C/index";
import { v4 } from "uuid";
import UsersInfo from "./UsersInfo/UsersInfo";

const index = () => {
    const [leftSideCategory, setLeftSideCategory] = useState<
        AdminLeftSideBarCategoryItems[]
    >([
        {
            _id: v4(),
            name: "Users",
            active: true,
            categoryOf: "",
            haveCats: false,
            selected: true,
        },
        {
            _id: v4(),
            name: "Access Rights",
            active: true,
            categoryOf: "",
            haveCats: true,
            selected: false,
        },
        {
            _id: v4(),
            name: "Moderation",
            active: true,
            categoryOf: "",
            haveCats: true,
            selected: false,
        },
        {
            _id: v4(),
            name: "Security",
            active: true,
            categoryOf: "",
            haveCats: true,
            selected: false,
        },
    ]);

    const [leftSideSubCategory, setLeftSideSubCategory] = useState<
        AdminLeftSideBarCategoryItems[]
    >([
        {
            _id: v4(),
            name: "Admin",
            active: false,
            categoryOf: "Access Rights",
            haveCats: false,
            selected: false,
        },
        {
            _id: v4(),
            name: "Employee",
            active: false,
            categoryOf: "Access Rights",
            haveCats: false,
            selected: false,
        },
        {
            _id: v4(),
            name: "Content",
            active: false,
            categoryOf: "Moderation",
            haveCats: false,
            selected: false,
        },
        {
            _id: v4(),
            name: "Users",
            active: false,
            categoryOf: "Moderation",
            haveCats: false,
            selected: false,
        },
        {
            _id: v4(),
            name: "Blocked Users",
            active: false,
            categoryOf: "Security",
            haveCats: false,
            selected: false,
        },
        {
            _id: v4(),
            name: "Flagged Users",
            active: false,
            categoryOf: "Security",
            haveCats: false,
            selected: false,
        },
    ]);

    return (
        <SitePageContainer title="Admin Panel">
            <div style={{ marginTop: "85px" }}>
                <LeftSideBar
                    leftSideCategory={leftSideCategory}
                    subCategory={leftSideSubCategory}
                    setLeftSideCategory={setLeftSideCategory}
                    setLeftSideSubCategory={setLeftSideSubCategory}
                />
                <UsersInfo />
            </div>
        </SitePageContainer>
    );
};

export default index;
