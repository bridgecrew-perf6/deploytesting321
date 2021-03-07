import React from "react";
import IconBtns from "./NavBar/IconBtns";
import TimeAgo from "react-timeago";

interface PollMetrics {
  created: string;
}

export default function PollMetrics({ created }: PollMetrics) {
  return (
    <div className="d-flex justify-content-between border border-secondary align-items-center">
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ width: "19%" }}
      >
        <IconBtns
          btnDetails={{
            btnType: "showComments",
            pollObj: {},
            size: 20,
          }}
        />
        <label style={{ fontSize: 14, paddingTop: "1px" }}>300</label>
      </div>
      <label style={{ fontSize: 14 }}>
        <TimeAgo date={created} live={false} />
      </label>
      {/* <ul className="list-group list-group-horizontal justify-content-between">
        <li
          className="d-flex flex-row justify-content-between align-items-center border border-primary"
          style={{ width: "18%" }}
        >
          <IconBtns
            btnDetails={{
              btnType: "showComments",
              pollObj: {},
              size: 22,
            }}
          />
          <label style={{ fontSize: 14 }}>300</label>
        </li>
        <li className="list-group-item" style={{ fontSize: 14 }}>
          <TimeAgo date={created} live={false} />
        </li>
      </ul> */}
    </div>
  );
}
