import { useEffect, useState } from "react";
import "jquery";
import styles from "../../../appStyles/appStyles.module.css";
// import { errorHandling, ErrorList } from "../../formFuncs/errorFuncs";
import { ErrorList } from "../../formFuncs/formFuncs";
import { CardForm } from "../../layout/CompStyles";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../authProvider/authProvider";
import { ErrorMssg, NewPollForm } from "../../appTypes/appType";
// import { CustomHeaderTxt } from "../../layout/branding";

export default function NewPoll() {
  const { appColor, appTxt, formTxt } = styles;

  const [formErrors, setFormErrors] = useState<ErrorMssg[]>([]);
  const [formVal, updateFormVal] = useState({});
  const [charCount, updateCharCount] = useState(0);
  const { CREATE_POLL } = GraphResolvers.mutations;
  const [createPoll, { loading, error }] = useMutation(CREATE_POLL);
  const appContext = useAuth();
  // const { updateAppMessages } = useAuth();

  // Placeholder categories until list retrieved from MongoDb
  const pollCategories = [
    { id: 1, value: "Sports" },
    { id: 2, value: "Entertainment" },
    { id: 3, value: "Mommas and Poppas" },
    { id: 4, value: "Technology" },
    { id: 5, value: "Pop Culture" },
  ];

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const question = (document.getElementById("question") as HTMLInputElement)
      .value;
    const topic = (document.getElementById("topic") as HTMLInputElement).value;

    const formVal: NewPollForm = { question, topic };

    const errors: ErrorMssg[] = [];

    let key: keyof NewPollForm;

    for (key in formVal) {
      const prop_val = formVal[key];

      if (prop_val.length === 0) {
        errors.push({ message: `Please fill out the ${key} field` });
      }

      if (key === "question" && prop_val.length > 250) {
        errors.push({
          message: `Please edit the question. You are ${
            prop_val.length - 250
          } characters over.`,
        });
      }
    }
    setFormErrors(errors);

    if (errors.length === 0) {
      try {
        await createPoll({
          variables: { details: JSON.stringify(formVal) },
        });
        appContext?.updateAppMssgs([
          { msgType: 1, message: "Poll Created successfully" },
        ]);
        ($("#newPollModal") as any).modal("hide"); //closes modal programitically
        clearForm();
      } catch (err) {
        setFormErrors([err]);
      }
    }
  };

  const clearForm = () => {
    setFormErrors([]);
    updateCharCount(0);
    (document.getElementById("newPoll") as HTMLFormElement).reset();
  };

  const countCharacters = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    updateCharCount(e.target.value.length);
  };

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
                <label
                  htmlFor="question"
                  className={`col-form-label ${formTxt}`}
                >
                  Poll Question
                </label>
                <textarea
                  className="form-control"
                  id="question"
                  rows={4}
                  onChange={countCharacters}
                ></textarea>
              </div>
              <label
                className="d-flex flex-row-reverse"
                style={{ fontSize: 12 }}
              >{`${charCount}/250`}</label>
              <div className="form-group">
                <label htmlFor="topic" className={`col-form-label ${formTxt}`}>
                  Poll Topic
                </label>
                <select multiple className="form-control" id="topic">
                  {pollCategories.map((item) => (
                    <option key={item.id}>{item.value}</option>
                  ))}
                </select>
              </div>
            </form>
            {formErrors.length > 0 && <ErrorList errors={formErrors} />}
          </div>
          <div className="modal-footer">
            <div className="d-flex justify-content-between flex-fill p-2">
              <div>
                <button type="button" className={`btn ${appColor} text-white`}>
                  Insert Image
                </button>
              </div>
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
