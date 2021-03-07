import React, { useState } from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { BiComment, BiShareAlt } from "react-icons/bi";
import { BsChatSquareDots } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import {
  RiSendPlane2Fill,
  RiLandscapeLine,
  RiLandscapeFill,
} from "react-icons/ri";
import styles from "../../../../appStyles/appStyles.module.css";

interface BtnProps {
  btnDetails: {
    btnType: string;
    pollObj?: { like?: boolean; dislike?: boolean };
    size: number;
    color?: string;
  };
}

const IconBtns: React.FC<BtnProps> = ({ btnDetails }) => {
  const { btnType, pollObj, size, color } = btnDetails;

  let BtnObj: IconType | undefined;

  if (btnType === "like" && pollObj?.like) {
    BtnObj = AiFillLike;
  } else if (btnType === "like" && !pollObj?.like) {
    BtnObj = AiOutlineLike;
  } else if (btnType === "dislike" && pollObj?.dislike) {
    BtnObj = AiFillDislike;
  } else if (btnType === "dislike" && !pollObj?.dislike) {
    BtnObj = AiOutlineDislike;
  } else if (btnType === "showComments") {
    BtnObj = BiComment;
  } else if (btnType === "showReply") {
    BtnObj = BsChatSquareDots;
  } else if (btnType === "share") {
    BtnObj = BiShareAlt;
  } else if (btnType === "addComment") {
    BtnObj = RiSendPlane2Fill;
  } else BtnObj = undefined;

  return (
    <div className={`${styles.cursor} d-flex align-items-center`}>
      {BtnObj && <BtnObj size={size} color={color ? color : "gray"} />}
    </div>
  );
};

export default IconBtns;

// export const ToggleIconFillEmpty = (iconType, iconValue) => {
//   const initialState = {};
//   initialState[iconType] = !iconValue;

//   const [iconObj, updateIconObj] = useState(initialState);

// };
