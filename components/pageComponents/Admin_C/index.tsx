import React from "react";
import LeftSideBar from "./LeftSideBar";

const index = (props: any) => {
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
