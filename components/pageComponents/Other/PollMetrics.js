import React from "react";
import IconBtns from "./NavBar/IconBtns";
import TimeAgo from "react-timeago";

export default function PollMetrics({ created }) {
  return (
    <div className="border border-secondary p-2">
      <ul className="list-group list-group-horizontal">
        <li
          className="d-flex flex-row justify-content-between"
          style={{ width: "18%" }}
        >
          <IconBtns
            btnDetails={{
              btnType: "showComments",
              pollObj: {},
              size: 20,
            }}
          />
          300
        </li>
        <li className="list-group-item">
          <TimeAgo date={created} live={false} />
        </li>
      </ul>
    </div>
  );
}
