import { useState } from "react";
import { AiOutlineSmile, AiFillSmile } from "react-icons/ai";
import { HiOutlineEmojiSad, HiEmojiSad } from "react-icons/hi";
import { IoShareSocialOutline, IoShareSocialSharp } from "react-icons/io5";
import {
  RiQuestionAnswerLine,
  RiQuestionAnswerFill,
  RiLandscapeLine,
  RiLandscapeFill,
} from "react-icons/ri";
import pollStyles from "../../../../appStyles/pollStyles.module.css";

export const getButtonIcon = (
  btnType: string,
  btnState: boolean,
  btnFunction: (btnState: boolean) => void,
  btnTitle?: string
) => {
  let BtnIcon: any;
  let btnColor: string | undefined;

  const tooltip: string = btnType.split("-")[0];

  let iconToolTip: string;

  if (btnTitle) {
    iconToolTip = btnTitle;
  } else if (tooltip === "answer") {
    iconToolTip = "Total Answers";
  } else iconToolTip = tooltip;

  switch (true) {
    case btnType === "like-empty":
      BtnIcon = AiOutlineSmile;
      break;
    case btnType === "like-fill":
      BtnIcon = AiFillSmile;
      btnColor = "gray";
      break;
    case btnType === "dislike-empty":
      BtnIcon = HiOutlineEmojiSad;
      break;
    case btnType === "dislike-fill":
      BtnIcon = HiEmojiSad;
      btnColor = "gray";
      break;
    case btnType === "share-empty":
      BtnIcon = IoShareSocialOutline;
      break;
    case btnType === "share-fill":
      BtnIcon = IoShareSocialSharp;
      btnColor = "gray";
      break;
    case btnType === "answer-empty":
      BtnIcon = RiQuestionAnswerLine;
      break;
    case btnType === "answer-fill":
      BtnIcon = RiQuestionAnswerFill;
      btnColor = "gray";
      break;
    case btnType === "image-fill":
      BtnIcon = RiLandscapeFill;
      btnColor = "gray";
      break;
    case btnType === "image-empty":
      BtnIcon = RiLandscapeLine;
      break;
  }

  return (
    <BtnIcon
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      title={iconToolTip}
      size={25}
      style={{ cursor: "pointer" }}
      color={btnColor}
      onClick={() => btnFunction(!btnState)}
    />
  );
};

export const PollFilters = () => {
  const [sortVal, setSortVal] = useState("");

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle border border-light"
        style={{ backgroundColor: "#ff4d00" }}
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {sortVal ? `Sort By:  ${sortVal}` : "Sort By"}
      </button>
      {getDropDownItems(setSortVal)}
    </div>
  );
};

const getDropDownItems = (setItem: (selectedItem: string) => void) => {
  const dropdown_actions = ["Most Liked", "Most Disliked", "Newest", "Oldest"];

  return (
    <div className={`dropdown-menu ${pollStyles.ddItem}`}>
      {dropdown_actions.map((item, index) => (
        <a
          key={index}
          className="dropdown-item"
          href="#"
          onClick={() => setItem(item)}
        >
          {item}
        </a>
      ))}
    </div>
  );
};
