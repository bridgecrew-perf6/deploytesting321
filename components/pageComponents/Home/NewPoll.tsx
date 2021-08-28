import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "jquery";
import { FiPlusSquare } from "react-icons/fi";
import styles from "../../../appStyles/appStyles.module.css";
import { ErrorList } from "../../formFuncs/formFuncs";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  ErrorMssg,
  ISubTopic,
  SelectedImage,
  SelectedSubTopic,
  SelectedTopic,
} from "../../appTypes/appType";
import TopicWindow from "../Other/TopicWindow";
import { SubTopicWindow } from "../Other/TopicWindow/subTopic";
import {
  SelectedTopicBtn,
  SearchBar,
  AddSubTopic,
  ErrorMssgCtr,
} from "./newPollComps";
import { saveImgtoCloud } from "../../apis/imgUpload";
import ImgPicker from "../Other/Image/ImgPicker";
import { filterSearchVals } from "../../formFuncs/miscFuncs";
import { ToolTipCtr } from "../../layout/customComps";

const RichTextEditor = dynamic(() => import("../Other/RichText"), {
  ssr: false,
});

// import RichTextEditor from "../Other/RichText";

export default function NewPoll() {
  //Styles
  const { appColor, appTxt, formTxt } = styles;

  //API
  const { CREATE_POLL } = GraphResolvers.mutations;
  const { GET_POLLS_ALL, GET_TOPICS, GET_SUBTOPICS_PER_TOPIC } =
    GraphResolvers.queries;
  const [createPoll] = useMutation(CREATE_POLL);
  const { data } = useQuery(GET_TOPICS);
  const [getSubTopics, { data: subTopicsData }] = useLazyQuery(
    GET_SUBTOPICS_PER_TOPIC
  );

  //State Management
  const topicInitialState: SelectedTopic = { id: "", topic: "" };
  const [formErrors, setFormErrors] = useState<ErrorMssg[]>([]);
  const [subTopics, setSubTopics] = useState<ISubTopic[]>([]);
  const [selectedImgs, selectImgs] = useState<SelectedImage[]>([]);
  const [charCount, updateCharCount] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(topicInitialState);
  const [addBtn, toggleAddBtn] = useState(false);
  const [selectedSubTopics, setSelectedSubTopics] = useState<
    SelectedSubTopic[]
  >([]);

  //Context and app Render hooks
  // const appContext = useAuth();
  useEffect(() => {
    manageSubTopicData();
  }, [subTopicsData]);

  //Functions

  const manageSubTopicData = () => {
    subTopicsData && setSubTopics(subTopicsData.subTopicsPerTopic);
  };

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const results = filterSearchVals(
      subTopicsData.subTopicsPerTopic,
      e.target.value,
      "subTopic"
    );

    setSubTopics(results);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const question = (document.getElementById("question") as HTMLInputElement)
      .value;

    const errors: ErrorMssg[] = [];

    question.length > 250 &&
      errors.push({
        message:
          "Your question is over 250 characters.  Please edit the question.",
      });

    question.length === 0 &&
      errors.push({ message: "Please provide a question." });

    selectedTopic.topic === "" &&
      errors.push({
        message: "Please choose a topic.",
      });

    selectedSubTopics.length === 0 &&
      errors.push({
        message: "Please choose at least one sub topic.",
      });

    setFormErrors(errors);

    if (errors.length === 0) {
      setFormErrors([]);
      const subTopics = selectedSubTopics.map((item) => item.id);
      const imgIds: string[] | undefined = await saveImgtoCloud(selectedImgs);

      const pollItem = {
        question,
        topic: selectedTopic.id,
        subTopics,
        pollImages: imgIds && imgIds,
      };

      createPoll({
        variables: { details: JSON.stringify(pollItem) },
        refetchQueries: [{ query: GET_POLLS_ALL }],
      });

      ($("#newPollModal") as any).modal("hide"); //closes modal programitically
      clearForm();
    }
  };

  const clearForm = () => {
    selectImgs([]);
    setFormErrors([]);
    updateCharCount(0);
    setSelectedTopic(topicInitialState);
    (document.getElementById("newPoll") as HTMLFormElement).reset();
    manageSubTopicData();
  };

  // const countCharacters = (questionLength: number) => { //For RichTextEditor component only
  //   updateCharCount(questionLength);
  // };

  const countCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    updateCharCount(e.target.value.length);
  };

  const chooseTopic = async (topic: { id: string; topic: string }) => {
    getSubTopics({ variables: { topic: topic.topic } });
    setSelectedTopic(topic);
    toggleAddBtn(false);
    setSelectedSubTopics([]);
  };

  const charDivStyle =
    charCount > 250
      ? { fontSize: 14, color: "red", fontWeight: 600 }
      : { fontSize: 14 };

  return (
    <div
      className="modal fade"
      id="newPollModal"
      tabIndex={-1}
      aria-labelledby="newPollModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className={`${appColor} p-2`}>
            <h3 className={`text-center p-2 modal-title ${appTxt}`}>
              NEW POLL
            </h3>
          </div>
          <div className="modal-body">
            <form id="newPoll">
              <div className="form-group">
                <div className="d-flex justify-content-between align-items-center">
                  <label
                    htmlFor="question"
                    className={`col-form-label ${formTxt}`}
                  >
                    Poll Question
                  </label>
                  <div style={charDivStyle}>{`${charCount}/250`}</div>
                </div>
                {/* <RichTextEditor countChar={countCharacters} /> */}
                <textarea
                  className="form-control"
                  id="question"
                  rows={4}
                  onChange={countCharacters}
                ></textarea>
              </div>
              <ImgPicker selectedImgs={selectedImgs} selectImgs={selectImgs} />
              <div className="form-group mb-5 mt-3 d-flex flex-column justify-content-between">
                <div className="d-flex mb-1 justify-content-between">
                  <label
                    htmlFor="topic"
                    className={`col-form-label ${formTxt} d-flex align-items-center`}
                    style={{ height: 50 }}
                  >
                    Select Poll Topic
                  </label>
                  {selectedTopic.topic && (
                    <div className="d-flex w-75 align-items-center">
                      <SelectedTopicBtn
                        btnType="topic"
                        selectedTopic={selectedTopic}
                        selectedSubTopics={selectedSubTopics}
                        setSelectedTopic={setSelectedTopic}
                        setSelectedSubTopics={setSelectedSubTopics}
                      />
                    </div>
                  )}
                </div>
                <TopicWindow
                  data={data?.topics}
                  selectedTopic={selectedTopic}
                  setTopic={chooseTopic}
                />
              </div>
              {selectedTopic.topic && (
                <>
                  <div className="form-group">
                    <div
                      className="d-flex flex-column mb-1"
                      // style={{ height: "7vh" }}
                    >
                      <div className="d-flex justify-content-between">
                        <label
                          htmlFor="subTopic"
                          className={`col-form-label ${formTxt} d-flex align-items-center`}
                          style={{ height: 50 }}
                        >
                          Select Poll SubTopic(s)
                        </label>
                        {selectedSubTopics && (
                          <div className="d-flex w-75">
                            <SelectedTopicBtn
                              btnType="subTopic"
                              selectedTopic={selectedTopic}
                              selectedSubTopics={selectedSubTopics}
                              setSelectedTopic={setSelectedTopic}
                              setSelectedSubTopics={setSelectedSubTopics}
                            />
                          </div>
                        )}
                      </div>
                      <SearchBar search={updateSearch} />
                    </div>
                    <SubTopicWindow
                      data={subTopics}
                      selectedSubTopics={selectedSubTopics}
                      setSubTopics={setSelectedSubTopics}
                    />
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ fontSize: 14 }}
                  >
                    <div
                      className={styles.cursor}
                      onClick={() => toggleAddBtn(!addBtn)}
                    >
                      <ToolTipCtr
                        mssg="Add new Sub-Topic"
                        position="right"
                        style={{ bottom: "0", left: "92px" }}
                      >
                        <FiPlusSquare size="28px" color="#ff4d00" />
                      </ToolTipCtr>
                    </div>

                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{ width: "20%" }}
                    >
                      <div>Select up to 3</div>
                      <div className="">{`${selectedSubTopics.length}/3`}</div>
                    </div>
                  </div>
                  {addBtn && (
                    <AddSubTopic
                      show={toggleAddBtn}
                      topic={selectedTopic}
                      setErrors={setFormErrors}
                      subTopics={selectedSubTopics}
                      setSubTopic={setSelectedSubTopics}
                    />
                  )}
                </>
              )}
            </form>
            {formErrors.length > 0 && <ErrorList errors={formErrors} />}
          </div>
          <div className="modal-footer">
            <div className="d-flex justify-content-between flex-fill p-2 flex-row-reverse">
              <div
                className="d-flex justify-content-between"
                style={{ width: "40%" }}
              >
                <button
                  type="button"
                  onClick={() => clearForm()}
                  id="submitButton"
                  className={`btn ${appColor} text-white`}
                >
                  Clear Poll
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  id="submitButton"
                  className={`btn ${appColor} text-white`}
                >
                  Create Poll
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => clearForm()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
