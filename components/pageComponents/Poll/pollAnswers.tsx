import React, { useEffect, useState } from "react";
import pollStyles from "../../../appStyles/pollStyles.module.css";
import appStyles from "../../../appStyles/appStyles.module.css";
import DataSlider from "../Slider";
import TimeAgo from "react-timeago";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { Answer, SliderSettings, User } from "../../appTypes/appType";
import { useMutation, useQuery } from "@apollo/client";
import AppLoading from "../Other/Loading";
import { useAuth } from "../../authProvider/authProvider";

const { answerItem, pollHeaderTxt, itemIcon, itemIconBadge } = pollStyles;

interface PollAnswer {
  creator: User | undefined;
  poll: string;
  loading: boolean;
  answers: Answer[] | undefined | null;
}

const PollAnswers = ({ creator, poll, loading, answers }: PollAnswer) => {
  const sliderSettings: SliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    slidesPerRow: 2,
  };

  const authState = useAuth();
  const userId = authState?.authState?.user?._id;

  const [handleLikes_disLikes] = useMutation(
    GraphResolvers.mutations.LIKE_DISLIKE_HANDLER
  );

  const likeHandler = (
    feedback: string,
    feedbackVal: boolean,
    answerId: string
  ) => {
    handleLikes_disLikes({
      variables: {
        feedback,
        feedbackVal,
        answerId,
      },
      refetchQueries: [
        {
          query: GraphResolvers.queries.GET_ANSWERS_BY_POLL,
          variables: { pollId: poll },
        },
      ],
    });
  };

  if (loading) {
    return (
      <div
        className={`alert alert-light d-flex flex-column align-items-center`}
        style={{ margin: "1.5vh" }}
      >
        <AppLoading
          style={{ height: "40px", width: "40px" }}
          message="Poll Answers"
        />
      </div>
    );
  }

  return (
    <div
      className="alert alert-light d-flex flex-column align-items-center"
      style={{ margin: "1.5vh" }}
    >
      <h5 className={`${pollHeaderTxt}`}>POLL ANSWERS</h5>
      <DataSlider settings={sliderSettings}>
        {answers && answers.length > 0 ? (
          answers.map((item: Answer) => (
            <AnswerItem
              data={item}
              key={item._id}
              likeHandler={likeHandler}
              userId={userId && userId}
            />
          ))
        ) : (
          <div>
            There are no answers for this poll. Be the first to provide an
            answer!
          </div>
        )}
      </DataSlider>
    </div>
  );
};

interface AnswerItem {
  data: Answer;
  likeHandler: (handlerCat: string, val: boolean, id: string) => void;
  userId: string;
}

const AnswerItem = ({ data, likeHandler, userId }: AnswerItem) => {
  const likeMatch = data.likes.some((item) => item.userId === userId);
  const dislikeMatch = data.dislikes.some((item) => item.userId === userId);

  const likeBtnStyle = likeMatch
    ? "btn btn-success text-white mt-2 mr-1"
    : "btn btn-none text-muted mt-2 mr-1";

  const dislikeBtnStyle = dislikeMatch
    ? "btn btn-danger text-white mt-2 mr-1"
    : "btn btn-none text-muted mt-2 mr-1";

  return (
    <div className={`p-3 m-2 ${answerItem} rounded`}>
      <div
        className="d-flex justify-content-between border-bottom"
        style={{ height: "15%" }}
      >
        <p className="" style={{ fontSize: 13 }}>
          {data.creator?.appid}
        </p>
        <TimeAgo
          date={data.creationDate}
          live={false}
          style={{ fontSize: 13 }}
        />
      </div>
      <div className="pt-2 pb-2" style={{ height: "65%" }}>
        <p className="text-muted" style={{ fontSize: 14 }}>
          {data.answer}
        </p>
      </div>

      <div
        className="d-flex justify-content-between align-items-center border-top pt-2"
        style={{ height: "20%" }}
      >
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ width: "25%" }}
        >
          <button
            className={likeBtnStyle}
            style={{ fontSize: 13 }}
            onClick={() => likeHandler("like", true, data._id)}
          >
            Like
          </button>
          <button
            className={dislikeBtnStyle}
            style={{ fontSize: 13 }}
            onClick={() => likeHandler("dislike", true, data._id)}
          >
            Dislike
          </button>
        </div>

        <div
          className="mt-2 rounded p-2 text-white"
          style={{ fontSize: 13, backgroundColor: "#1e90ff" }}
        >
          100 out of 100
        </div>

        <div
          className="d-flex justify-content-between"
          style={{ width: "20%" }}
        >
          <div className={`${itemIcon}`}>
            <img
              src="https://res.cloudinary.com/rahmad12/image/upload/v1620773139/PoldIt/App_Imgs/Smile-fill_wx6ltm.png"
              alt=""
              style={{ height: 36, width: 36 }}
            />
            <span className={`badge`} style={{ color: "#006100" }}>
              {data.likes.length}
            </span>
          </div>
          <div className={`${itemIcon} mb-2`}>
            <img
              src="https://res.cloudinary.com/rahmad12/image/upload/v1620773139/PoldIt/App_Imgs/Sad_fill_kywf7r.png"
              alt=""
              style={{ height: 36, width: 36 }}
            />
            <span className={`badge`} style={{ color: "red" }}>
              {data.dislikes.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollAnswers;
