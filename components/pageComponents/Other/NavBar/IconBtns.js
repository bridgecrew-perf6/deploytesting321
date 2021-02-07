import React from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { BiComment, BiShareAlt } from "react-icons/bi";
import { BsChatSquareDots } from "react-icons/bs";
import {
  RiSendPlane2Fill,
  RiLandscapeLine,
  RiLandscapeFill,
} from "react-icons/ri";
import { cursor } from "../../../../appStyles/appStyles.module.css";

export default function IconBtns({ btnDetails }) {
  const { btnType, pollObj, size, color } = btnDetails;

  let BtnObj;

  if (btnType === "like" && pollObj.like) {
    BtnObj = AiFillLike;
  } else if (btnType === "like" && !pollObj.like) {
    BtnObj = AiOutlineLike;
  } else if (btnType === "dislike" && pollObj.dislike) {
    BtnObj = AiFillDislike;
  } else if (btnType === "dislike" && !pollObj.dislike) {
    BtnObj = AiOutlineDislike;
  } else if (btnType === "showComments") {
    BtnObj = BiComment;
  } else if (btnType === "showReply") {
    BtnObj = BsChatSquareDots;
  } else if (btnType === "share") {
    BtnObj = BiShareAlt;
  } else if (btnType === "addComment") {
    BtnObj = RiSendPlane2Fill;
  }

  return (
    <div className={`${cursor} d-flex align-items-center`}>
      <BtnObj size={size} color={color ? color : "gray"} />
    </div>
  );
}
