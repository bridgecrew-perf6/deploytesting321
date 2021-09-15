import React, { useRef, useState } from "react";
import pollStyles from "../../../appStyles/pollStyles.module.css";
import appStyles from "../../../appStyles/appStyles.module.css";
import btnStyles from "../../../appStyles/btnStyles.module.css";
import { Answer, SelectedImage } from "../../appTypes/appType";
import TimeAgo from "react-timeago";
import { getButtonIcon } from "../Other/siteIconCtrs/pollIconFuncs";
import { imgPickerHandler } from "../../formFuncs/miscFuncs";
import ImgPicker, { ImagePicker } from "../Other/Image/ImgPicker";

const { customBtn, customBtnOutline, customBtnOutlinePrimary } = btnStyles;
// import { useMutation } from "@apollo/client";
// import GraphResolvers from "../../../lib/apollo/apiGraphStrings";

// const { CREATE_ANSWER, UPLOAD_IMAGE } = GraphResolvers.mutations;
// const { GET_ANSWERS_BY_POLL } = GraphResolvers.queries;

// interface IPollFilters {
//     filterList: (filterType: string, itemList: ) => void ,
//     itemList: ,
//     sortVal: ,
//     btnType: ,
// }

export const PollFilters = () => {
  return <div></div>;
};

interface AddAnswer {
  addAnswer: (answer: string, answerImages: SelectedImage[]) => void;
  addError: (errMssg?: string) => void;
  toggleWindow: () => void;
}

export const AddAnswer = ({ addAnswer, addError, toggleWindow }: AddAnswer) => {
  const inputRef = useRef(null);
  const [answer, updateAnswer] = useState("");
  const [imgBtnState, toggleImg] = useState(false);
  const [selectedImgs, selectImgs] = useState<SelectedImage[]>([]);

  return (
    <li className="list-group-item text-left rounded">
      <div className="d-flex h-75">
        <textarea
          className="form-control bd-highlight p-2 flex-grow-1 bd-highlight text-lg-left"
          id="answerTextArea"
          rows={2}
          maxLength={200}
          placeholder="Provide an answer..."
          onChange={(e) => updateAnswer(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <ImgPicker selectedImgs={selectedImgs} selectImgs={selectImgs} />
      </div>
      <div className="d-flex flex-row-reverse">
        <div>
          <button
            className={`${customBtn} ${customBtnOutline} ${customBtnOutlinePrimary}`}
            style={{ fontSize: 13 }}
            onClick={() => {
              if (answer.length === 0) {
                addError("Please provide an answer to the poll!");
                return;
              }
              addError();
              addAnswer(answer, selectedImgs);
              toggleWindow();
            }}
          >
            Submit Answer
          </button>
        </div>
      </div>
    </li>
  );
};

interface PollAnswer {
  answer: Answer;
}

export const PollAnswer = ({ answer }: PollAnswer) => {
  return (
    <li className={`list-group-item text-left ${pollStyles.listItem}`}>
      {answer.answer}
    </li>
  );
};
