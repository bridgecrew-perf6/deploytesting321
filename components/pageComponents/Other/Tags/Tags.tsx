import { ISubTopic, User } from "../../../appTypes/appType";
import TimeAgo from "react-timeago";
import React, { useEffect, useState } from "react";
import ProfileImg from "../../Profile/profileImg";
import Favorite from "../../Poll/PollCtrs/favorite";

interface TagWindow {
  pollId: string;
  topic: string;
  subTopics: ISubTopic[];
}

export const TagWindow = ({ pollId, topic, subTopics }: TagWindow) => {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <Favorite favId={pollId} favType="Poll" />
      <div className="pr-2" style={{ fontWeight: 700, fontSize: 18 }}>
        {topic}
      </div>
      <ul className="list-group list-group-horizontal">
        {subTopics.map((item) => (
          <li
            className={`p-2 m-2 list-group-item rounded border`}
            key={item._id}
            style={{ fontSize: 13 }}
          >
            {item.subTopic}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface UserTagWindow {
  user: User | undefined;
  createdDate: string;
}

export const UserTagWindow = ({ user, createdDate }: UserTagWindow) => {
  return (
    <div className="d-flex align-items-center">
      <ProfileImg
        profilePic={user?.profilePic}
        id={user?._id}
        appId={user?._id}
        picStyle={{ height: 50, width: 50 }}
        color={"gray"}
      />
      <div
        className="d-flex flex-column align-items-end justify-content-center pl-2"
        style={{ fontSize: 14 }}
      >
        {`Created by ${user?.appid}`}
        <label>
          <TimeAgo date={createdDate} live={false} />
        </label>
      </div>
    </div>
  );
};
