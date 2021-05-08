import { ISubTopic } from "../../../appTypes/appType";
import TimeAgo from "react-timeago";
import { useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import styles from "../../../../appStyles/appStyles.module.css";
import ProfileImg from "../../Profile/profileImg";

interface TagWindow {
  topic: string;
  subTopics: ISubTopic[];
}

export const TagWindow = ({ topic, subTopics }: TagWindow) => {
  const [btnState, toggleBtn] = useState(false);

  const likeIcon = btnState ? (
    <AiTwotoneHeart
      size={25}
      color="red"
      onClick={() => toggleBtn(!btnState)}
    />
  ) : (
    <AiOutlineHeart size={25} onClick={() => toggleBtn(!btnState)} />
  );

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className={`pr-5 ${styles.cursor}`}>{likeIcon}</div>
      <div className="pr-2" style={{ fontWeight: 700, fontSize: 18 }}>
        {topic}
      </div>
      <ul className="list-group list-group-horizontal">
        {subTopics.map((item) => (
          <li
            className={`p-2 m-2 list-group-item rounded`}
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
  user: string | undefined;
  createdDate: string;
  profilePic: string | undefined | null
}

export const UserTagWindow = ({ user, createdDate, profilePic }: UserTagWindow) => {
  return (
    <div className="d-flex align-items-center">
      <ProfileImg
        profilePic={profilePic}
        picStyle={{ height: 50, width: 50 }}
        color={"gray"}
      />
      <div
        className="d-flex flex-column align-items-end justify-content-center pl-2"
        style={{ fontSize: 14 }}
      >
        {`Created by ${user}`}
        <label>
          <TimeAgo date={createdDate} live={false} />
        </label>
      </div>
    </div>
  );
};
