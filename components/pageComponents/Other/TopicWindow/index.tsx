import { ITopic, SelectedTopic } from "../../../appTypes/appType";
import appStyles from "../../../../appStyles/appStyles.module.css";
import AppLoading from "../Loading";

interface TopicWindow {
  data: ITopic[] | null;
  selectedTopic: SelectedTopic;
  setTopic: (topic: SelectedTopic) => void;
}

const TopicWindow = ({ data, selectedTopic, setTopic }: TopicWindow) => {
  if (!data) {
    return (
      <div className="d-flex">
        <AppLoading
          style={{ height: "50", width: "50" }}
          message={"SubTopics"}
        />
      </div>
    );
  }

  return (
    <div className="d-flex">
      <ul className="list-group list-group-horizontal d-flex justify-content-between">
        {data.map((item) => {
          const iconColor =
            item.topic === selectedTopic.topic
              ? `text-white btn ${appStyles.appColor}`
              : "btn btn-outline-secondary";

          return (
            <li
              className={`p-2 m-2 ${iconColor}`}
              key={item._id}
              typeof="button"
              onClick={() => setTopic({ id: item._id, topic: item.topic })}
            >
              {item.topic}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopicWindow;
