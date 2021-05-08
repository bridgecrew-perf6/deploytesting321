import React from "react";
import pollStyles from "../../../appStyles/pollStyles.module.css";
import { PollHistory } from "../../appTypes/appType";
import { numCountDisplay } from "../../formFuncs/miscFuncs";
import ImageDisplay from "../Other/Image";
import { PollIconCtr } from "../Other/siteIconCtrs/pollIconCtr";
import { TagWindow, UserTagWindow } from "../Other/Tags/Tags";

interface PollQuestion {
  pollData: PollHistory;
  showAdd: () => void;
}

const PollQuestion = ({ pollData, showAdd }: PollQuestion) => {
  const answerCount = numCountDisplay(pollData.answers.length);

  return (
    <div
      className={`alert alert-light ${pollStyles.questionWindow} justify-content-between`}
      style={{ height: "26vh" }}
      role="alert"
    >
      <div className="d-flex flex-row justify-content-between w-100">
        <TagWindow
          topic={pollData.topic.topic}
          subTopics={pollData.subTopics}
        />
        <UserTagWindow
          user={pollData.creator?.appid}
          profilePic={pollData.creator?.profilePic}
          createdDate={pollData.creationDate}
        />
      </div>
      <div
        className="d-flex flex-column w-100 justify-content-between"
        style={{ height: "15vh" }}
      >
        <p className={`${pollStyles.questionTxt}`}>{pollData.question}</p>
        {pollData.pollImages.length > 0 && (
          <ImageDisplay imgList={pollData.pollImages} />
        )}
      </div>
      <div className="d-flex w-100">
        <PollIconCtr showAdd={showAdd} numAnswers={answerCount} />
      </div>
    </div>
  );
};

export default PollQuestion;
