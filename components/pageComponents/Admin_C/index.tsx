import React from "react";
import LeftSideBar from "./LeftSideBar";

const index = (props: any) => {
    const {
        leftSideCategory,
        subCategory,
        setLeftSideCategory,
        setLeftSideSubCategory,
    } = props;
    return (
        <div>
            <LeftSideBar
                leftSideCategory={leftSideCategory}
                subCategory={subCategory}
                setLeftSideCategory={setLeftSideCategory}
                setLeftSideSubCategory={setLeftSideSubCategory}
            />
        </div>
    );
};

export default index;
