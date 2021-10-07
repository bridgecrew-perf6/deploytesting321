import { userInfo } from "os";
import React from "react";
import { adminLeftSidebarType } from "_components/index";
import LeftSideBar from "./LeftSideBar";

const index = (props: adminLeftSidebarType) => {
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
