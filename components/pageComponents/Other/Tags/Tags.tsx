import { ISubTopic, User } from "../../../appTypes/appType";
import TimeAgo from "react-timeago";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import styles from "../../../../appStyles/appStyles.module.css";
import ProfileImg from "../../Profile/profileImg";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { handleFavorite } from "../../../../lib/apollo/apolloFunctions/mutations";
import { useAuth } from "../../../authProvider/authProvider";

const { ADD_FAVORITE, REMOVE_FAVORITE } = GraphResolvers.mutations;
const { IS_FAVORITE } = GraphResolvers.queries;

interface TagWindow {
  pollId: string;
  topic: string;
  subTopics: ISubTopic[];
}

export const TagWindow = ({ pollId, topic, subTopics }: TagWindow) => {
  const [btnState, toggleBtn] = useState(false);

  const likeIcon = btnState ? (
    <AiTwotoneHeart size={25} color="red" />
  ) : (
    <AiOutlineHeart size={25} />
  );

  //api
  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(REMOVE_FAVORITE);
  const [isFavorite, { loading, error, data }] = useLazyQuery(IS_FAVORITE, {
    variables: { favType: "Poll", favId: pollId },
  });

  useEffect(() => {
    isFavorite();
    if (data) {
      toggleBtn(data.isFavorite);
    }
  }, [data, btnState]);

  const handleFavoriteBtn = () => {
    if (!btnState) {
      handleFavorite(addFavorite, "Poll", pollId);
      toggleBtn(true);
      return;
    }
    handleFavorite(removeFavorite, "Poll", pollId);
    toggleBtn(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      {JSON.stringify(data)}
      <div
        className={`pr-5 ${styles.cursor}`}
        onClick={() => handleFavoriteBtn()}
      >
        {likeIcon}
      </div>
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
  user: User | undefined;
  createdDate: string;
}

export const UserTagWindow = ({ user, createdDate }: UserTagWindow) => {
  return (
    <div className="d-flex align-items-center">
      <ProfileImg
        profilePic={user?.profilePic}
        id={user?._id}
        appId={user?.appid}
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
