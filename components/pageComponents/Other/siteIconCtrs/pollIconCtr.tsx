import React, { useState } from "react";
import btnStyles from "../../../../appStyles/btnStyles.module.css";
import { getButtonIcon, PollFilters } from "./pollIconFuncs";

const { customBtn, customBtnOutlinePrimary } = btnStyles;

interface PollIconCtr {
  showAdd: () => void;
  numAnswers: string;
}

export const PollIconCtr = ({ showAdd, numAnswers }: PollIconCtr) => {
  const [shareBtnState, toggleShare] = useState(false);
  const [answerBtnState, toggleAnswer] = useState(false);

  const shareBtn = shareBtnState
    ? getButtonIcon("share-fill", shareBtnState, toggleShare)
    : getButtonIcon("share-empty", shareBtnState, toggleShare);

  const answerBtn = answerBtnState
    ? getButtonIcon("answer-fill", answerBtnState, toggleAnswer)
    : getButtonIcon("answer-empty", answerBtnState, toggleAnswer);

  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div className="d-flex align-items-center w-100">
        <div style={{ width: "17%" }}>
          <PollFilters />
        </div>
        <div className="d-flex justify-content-between align-items-center ml-5">
          <button
            className={`${customBtn} ${customBtnOutlinePrimary}`}
            onClick={() => showAdd()}
          >
            Add Answer
          </button>
          <div className="d-flex align-items-center ml-5">
            {answerBtn}
            <div className="ml-3" style={{ color: "gray", fontWeight: 600 }}>
              {`${numAnswers} Answers`}
            </div>
          </div>
        </div>
      </div>
      {shareBtn}
    </div>
  );
};
