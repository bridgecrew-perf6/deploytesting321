import { useMutation } from "@apollo/client";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import btnStyles from "../../../../appStyles/btnStyles.module.css";

const { CREATE_TOPIC } = GraphResolvers.mutations;
const { GET_TOPICS } = GraphResolvers.queries;
const { customBtn, customBtnOutline, customBtnOutlinePrimary } = btnStyles;

const AddTopic = () => {
  const [createTopic, { data: topicData }] = useMutation(CREATE_TOPIC); //Remove in future.  This is for testing

  const handleTopic = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const topic = (document.getElementById("topicInput") as HTMLInputElement)
      .value;
    const description = (
      document.getElementById("topicDescription") as HTMLInputElement
    ).value;

    createTopic({
      variables: { topicInfo: JSON.stringify({ topic, description }) },
      refetchQueries: [{ query: GET_TOPICS }],
    });

    (document.getElementById("topicForm") as HTMLFormElement).reset();
  };

  return (
    <div
      className="modal fade"
      id="newTopicModal"
      tabIndex={-1}
      aria-labelledby="newTopicModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <form className="p-3 container" id="topicForm" onSubmit={handleTopic}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Topic
              </label>
              <input
                type="text"
                className="form-control"
                id="topicInput"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="topicDescription"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Create New Topic
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTopic;

export const NewTopicBtn = () => {
  return (
    <div
      className={`${customBtn} ${customBtnOutline} ${customBtnOutlinePrimary} my-2 my-sm-0`}
      typeof="button"
      data-toggle="modal"
      data-target="#newTopicModal"
    >
      Add Topic
    </div>
  );
};
