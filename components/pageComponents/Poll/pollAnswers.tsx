import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import pollStyles from "../../../appStyles/pollStyles.module.css";
import { Answer, SelectedImage, User } from "../../appTypes/appType";
import { AddAnswer, PollAnswer } from "./pollComps";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { ErrorToast } from "../Other/Error/Toast";
import AppLoading from "../Other/Loading";
import { saveImgtoCloud } from "../../apis/imgUpload";

interface PollAnswer {
  creator: User | undefined;
  newAnswer: boolean;
  poll: string;
  showAdd: () => void;
}

const { GET_ANSWERS_BY_POLL } = GraphResolvers.queries;

const PollAnswers = ({ creator, poll, newAnswer, showAdd }: PollAnswer) => {
  const [error, updateError] = useState<string[]>([]);

  const { data, loading } = useQuery(GET_ANSWERS_BY_POLL, {
    variables: { pollId: poll },
  });

  const [addAnswerToPolls] = useMutation(
    GraphResolvers.mutations.CREATE_ANSWER,
    {
      onError: (e) => addError(e.message),
    }
  );

  const removeError = (errId: number) => {
    let udpatedErrorList: string[] = [];
    if (error.length > 1) {
      udpatedErrorList = error.filter((item, idx) => errId === idx);
    } else {
      udpatedErrorList = [];
    }

    updateError(udpatedErrorList);
  };

  const addError = (errMssg?: string) => {
    if (errMssg) {
      updateError([...error, errMssg]);
    } else updateError([]);
  };

  const addAnswerToPoll = async (
    answer: string,
    answerImages: SelectedImage[]
  ) => {
    const imgIds: string[] | undefined = await saveImgtoCloud(answerImages);

    const answerObj = { answer, poll, answerImages: imgIds && imgIds };

    addAnswerToPolls({
      variables: {
        details: JSON.stringify(answerObj),
      },
      refetchQueries: [
        {
          query: GET_ANSWERS_BY_POLL,
          variables: { pollId: poll },
        },
      ],
    });

    showAdd();
  };

  if (loading) {
    return (
      <div
        className={`alert alert-light ${pollStyles.answerWindow} d-flex align-items-center justify-content-center`}
      >
        <AppLoading
          style={{ height: "130px", width: "130px" }}
          message="Poll Answers"
        />
      </div>
    );
  }

  return (
    <div className={`alert alert-light ${pollStyles.answerWindow}`}>
      <ul className="list-group">
        <div className="m-2">
          {newAnswer && (
            <AddAnswer addAnswer={addAnswerToPoll} addError={addError} />
          )}
          {error && (
            <ErrorToast
              mssgs={error}
              mssgType={"Poll Answer Error"}
              removeError={removeError}
            />
          )}
          {data && data.answersByPoll.length > 0 ? (
            data.answersByPoll.map((item: Answer) => (
              <div key={item._id} className="d-flex flex-column">
                <PollAnswer answer={item} />
              </div>
            ))
          ) : (
            <div>
              There are no answers for this poll. Be the first to provide an
              answer!
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default PollAnswers;
