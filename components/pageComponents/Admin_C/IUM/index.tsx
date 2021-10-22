import { userInfo } from "os";
import React from "react";
import { adminLeftSidebarType } from "_components/index";
import LeftSideBar from "./LeftSideBar";

const index = (props: adminLeftSidebarType) => {
  const {
    mastercategory,
    setmastercategory,
    loadingChecks,
    setLoadingChecks,
    data,
  } = props;
  return (
    <div>
      <LeftSideBar
        data={data}
        setLoadingChecks={setLoadingChecks}
        loadingChecks={loadingChecks}
        mastercategory={mastercategory}
        setmastercategory={setmastercategory}
      />
    </div>
  );
};

export default index;
