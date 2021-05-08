import { IoIosClose } from "react-icons/io";
import styles from "../../../../appStyles/appStyles.module.css";
import btnStyles from "../../../../appStyles/btnStyles.module.css";
import {
  ErrorMssg,
  SelectedSubTopic,
  SelectedTopic,
} from "../../../appTypes/appType";

import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { useMutation } from "@apollo/client";

const { CREATE_SUBTOPIC } = GraphResolvers.mutations;
const { GET_SUBTOPICS_PER_TOPIC } = GraphResolvers.queries;

interface TopicBtn {
  btnType: string;
  selectedTopic: SelectedTopic;
  selectedSubTopics: SelectedSubTopic[];
  setSelectedTopic: (selectedTopic: SelectedTopic) => void;
  setSelectedSubTopics: (selectedSubtopics: SelectedSubTopic[]) => void;
}

const { customBtn, customBtnOutline, customBtnOutlinePrimary } = btnStyles;

export const SelectedTopicBtn = ({
  btnType,
  selectedTopic,
  selectedSubTopics,
  setSelectedTopic,
  setSelectedSubTopics,
}: TopicBtn) => {
  if (btnType == "subTopic") {
    return (
      <ul className="list-group list-group-horizontal d-flex justify-content-between align-items-center">
        {selectedSubTopics.map((item) => (
          <li
            className={`d-flex justify-content-between align-items-center m-1 ${customBtn} ${customBtnOutline}`}
            style={{ height: "2.5vh" }}
            key={item.id}
          >
            <div className="font-weight-normal">{item.subTopic}</div>
            <div
              className={`ml-2 ${styles.cursor}`}
              onClick={() => {
                const updatedSubTopicList = selectedSubTopics.filter(
                  (subTopic) => subTopic !== item
                );
                setSelectedSubTopics(updatedSubTopicList);
              }}
            >
              <IoIosClose size="20px" />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      className={`d-flex align-items-center m-1 ${customBtn} ${customBtnOutline} `}
      style={{ height: "2.5vh" }}
    >
      <div className="font-weight-normal">
        {btnType == "topic" ? selectedTopic.topic : selectedSubTopics}
      </div>
      <div
        className={`ml-2 ${styles.cursor}`}
        onClick={() =>
          btnType == "topic"
            ? setSelectedTopic({ id: "", topic: "" })
            : setSelectedSubTopics([])
        }
      >
        <IoIosClose size="20px" />
      </div>
    </div>
  );
};

interface SearchProps {
  search: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ search }: SearchProps) => {
  return (
    <input
      type="text"
      className="form-control mb-2 mr-sm-2 d-flex"
      style={{ width: "37vh" }}
      id="inlineFormInputName2"
      placeholder="Search SubTopics"
      onChange={search}
    ></input>
  );
};

interface AddSubTopic {
  show: (btnState: boolean) => void;
  topic: SelectedTopic;
  setErrors: (errMsg: ErrorMssg[]) => void;
  subTopics: SelectedSubTopic[];
  setSubTopic: (subTopic: SelectedSubTopic[]) => void;
}

export const AddSubTopic = ({
  show,
  topic,
  setErrors,
  subTopics,
  setSubTopic,
}: AddSubTopic) => {
  const [createSubTopic, { loading, error }] = useMutation(CREATE_SUBTOPIC);

  const handleSubmit = async () => {
    const subTopicInputs = document.getElementsByTagName("input");

    const newSubTopic: any = {
      topic: topic.id,
      subTopic: "",
      description: "",
    };

    for (let i = 0; i < subTopicInputs.length; i++) {
      const { id, value } = subTopicInputs[i];
      if (["subTopic", "description"].includes(id)) {
        newSubTopic[id] = value;
      }
    }

    const subTopicInputsJSON: string = JSON.stringify(newSubTopic);

    try {
      const resp = await createSubTopic({
        variables: { subTopicInfo: subTopicInputsJSON },
        refetchQueries: [
          { query: GET_SUBTOPICS_PER_TOPIC, variables: { topic: topic.topic } },
        ],
      });

      setSubTopic([
        ...subTopics,
        {
          id: resp.data.createSubTopic._id,
          subTopic: newSubTopic.subTopic,
          new: true,
        },
      ]);
      show(false);
    } catch (err) {
      setErrors([{ message: err.message }]);
    }
  };

  return (
    <div className="mt-3">
      <label
        htmlFor="topic"
        className={`col-form-label ${styles.formTxt} d-flex align-items-center`}
        style={{ height: 50 }}
      >
        Add New Poll SubTopic
      </label>
      <div className="border border-secondary rounded p-2" id="addNewSubTopic">
        <div className="form-group">
          <label>New SubTopic Name</label>
          <input type="text" className="form-control" id="subTopic" />
        </div>
        <div className="form-group">
          <label>Description (Optional)</label>
          <input type="test" className="form-control" id="description" />
        </div>
        <div className="d-flex justify-content-between w-25">
          <button
            type="button"
            className={
              subTopics.length < 3
                ? `${customBtn} ${customBtnOutlinePrimary}`
                : "btn btn-secondary"
            }
            onClick={() => {
              subTopics.length < 3 && handleSubmit();
            }}
          >
            Add
          </button>
          <button
            type="reset"
            className="btn btn-outline-secondary"
            onClick={() => show(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

interface ErrMssg {
  errMssg: string;
  clearErr: (mssg: string) => void;
}

export const ErrorMssgCtr = ({ errMssg, clearErr }: ErrMssg) => {
  return (
    <div className="position-relative d-inline-flex align-items-center bg-danger text-white rounded p-1 pl-2 pr-5">
      {errMssg}
      <div
        className={`${styles.imgCancel} ${styles.cursor}`}
        style={{ top: 4 }}
        onClick={() => clearErr("")}
      >
        <IoIosClose size="22px" />
      </div>
    </div>
  );
};
