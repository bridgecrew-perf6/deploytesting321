import React, { useState } from "react";
import IconBtns from "./NavBar/IconBtns";
import { AiOutlineEye } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import styles from "../../../appStyles/appStyles.module.css";
import btnStyles from "../../../appStyles/btnStyles.module.css";
import { CustomBtn, ToolTipCtr } from "../../layout/customComps";
import Link from "next/link";
import { ChatMessage, PollHistory } from "../../appTypes/appType";
import { getButtonIcon } from "./siteIconCtrs/pollIconFuncs";
import { numCountDisplay } from "../../formFuncs/miscFuncs";

const { customBtn, customBtnOutline, customBtnOutlinePrimary } = btnStyles;

interface PollMetrics {
  data: PollHistory;
}

//Metrics are hardcoded.  Need to get from DB once comment feature live.

export default function PollMetrics({ data }: PollMetrics) {
  const [shareBtnState, toggleShare] = useState(false);

  const { answers, creationDate, _id, views, chatMssgs } = data;

  return (
    <div className="d-flex justify-content-between position-relative">
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ width: "25%" }}
      >
        <PollViews views={views ? views : 0} />
        <ChatBtn chats={chatMssgs ? chatMssgs.length : 0} />
        <AnswerCtr numAnswers={answers ? answers.length : 0} />
      </div>
      <div className="position-absolute" style={{ left: "50%", bottom: "1px" }}>
        <PollBtn pollId={_id} />
      </div>
      <ShareBtn btnState={shareBtnState} btnHandler={toggleShare} />
    </div>
  );
}

const AnswerCtr = ({ numAnswers }: { numAnswers: number }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <ToolTipCtr
        mssg="Number of Answers"
        position="top"
        style={{ bottom: "30px", left: "50%" }}
      >
        <div className="d-flex align-items-center mr-1">
          <IconBtns
            btnDetails={{
              btnType: "showComments",
              pollObj: {},
              size: 20,
            }}
          />
        </div>
      </ToolTipCtr>
      <span
        style={{
          fontSize: 14,
          paddingBottom: "3px",
          fontWeight: 500,
          color: "gray",
        }}
      >
        {numCountDisplay(numAnswers)}
      </span>
    </div>
  );
};

const PollViews = ({ views }: { views: number }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <ToolTipCtr
        mssg="Number of Poll Views"
        position="top"
        style={{ bottom: "30px", left: "50%" }}
      >
        <div className="d-flex align-items-center mr-1">
          <AiOutlineEye size={20} color="gray" />
        </div>
      </ToolTipCtr>
      <span
        style={{
          fontSize: 14,
          paddingBottom: "3px",
          fontWeight: 500,
          color: "gray",
        }}
      >
        {numCountDisplay(views)}
      </span>
    </div>
  );
};

export const PollBtn = ({ pollId }: { pollId: string }) => {
  return (
    <Link href={`/Polls/${pollId}`}>
      <div>
        <ToolTipCtr
          mssg="Go To Poll"
          position="top"
          style={{ bottom: "40px", left: "50%" }}
        >
          <CustomBtn fontSize={13}>Poll</CustomBtn>
        </ToolTipCtr>
      </div>
    </Link>
  );
};

interface ShareBtn {
  btnState: boolean;
  btnHandler: (btnState: boolean) => void;
}

const ShareBtn = ({ btnState, btnHandler }: ShareBtn) => {
  const shareBtn = btnState
    ? getButtonIcon("share-fill", btnState, btnHandler)
    : getButtonIcon("share-empty", btnState, btnHandler);

  return (
    <div>
      <ToolTipCtr
        mssg="Share With Others"
        position="top"
        style={{ bottom: "30px", left: "50%" }}
      >
        {shareBtn}
      </ToolTipCtr>
    </div>
  );
};

const ChatBtn = ({ chats }: { chats: number }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <ToolTipCtr
        mssg="Number of Chat Messages"
        position="top"
        style={{ bottom: "30px", left: "50%" }}
      >
        <div className="d-flex align-items-center mr-2">
          <BsChatDots size={17} color="gray" />
        </div>
      </ToolTipCtr>
      <span
        style={{
          fontSize: 14,
          paddingBottom: "3px",
          fontWeight: 500,
          color: "gray",
        }}
      >
        {numCountDisplay(chats)}
      </span>
    </div>
  );
};
