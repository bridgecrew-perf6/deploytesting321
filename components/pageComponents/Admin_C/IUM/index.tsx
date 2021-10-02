import { userInfo } from "os";
import React from "react";
import { adminLeftSidearType } from "_components/index";
import LeftSideBar from "./LeftSideBar";

const index = (props: adminLeftSidearType) => {
  const { mastercategory, setmastercategory } = props;
  return (
    <div>
      <LeftSideBar
        mastercategory={mastercategory}
        setmastercategory={setmastercategory}
      />
    </div>
  );
};

export default index;
