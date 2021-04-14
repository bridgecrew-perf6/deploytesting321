import { ISubTopic, SelectedSubTopic } from "../../../appTypes/appType";
import topicStyles from "../../../../appStyles/pollStyles.module.css";
import appStyles from "../../../../appStyles/appStyles.module.css";
import AppLoading from "../Loading";
import { useEffect } from "react";

interface SubTopicWindow {
  data: ISubTopic[] | undefined;
  selectedSubTopics: SelectedSubTopic[];
  setSubTopics: (subTopic: SelectedSubTopic[]) => void;
}

export const SubTopicWindow = ({
  data,
  selectedSubTopics,
  setSubTopics,
}: SubTopicWindow) => {
  useEffect(() => {
    for (let i = 0; i < selectedSubTopics.length; i++) {
      const subTopicItem = selectedSubTopics[i];
      if (subTopicItem.new) {
        const listItem = document.getElementById(subTopicItem.id);
        console.log(listItem);
        listItem?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [data]);

  const showSelectedSubTopics = (subTopic: SelectedSubTopic) => {
    if (
      !selectedSubTopics.some((item) => subTopic.subTopic === item.subTopic) &&
      selectedSubTopics.length < 3
    ) {
      setSubTopics([...selectedSubTopics, subTopic]);
    }
  };

  if (data) {
    return (
      <div
        className={`${topicStyles.subTopicWindow} d-flex overflow-auto`}
        style={{ maxHeight: "20vh", height: "15vh" }}
      >
        <ul
          className="list-group list-group-horizontal"
          id="subTopicWindow"
        >
          {data.map((item) => {
            const selectedItemColor =
              selectedSubTopics.some(
                (subTopic) => subTopic.subTopic == item.subTopic
              ) && `${appStyles.appColor} text-white`;

            return (
              <li
                className={`d-flex flex-column m-2 border`}
                style={{ maxWidth: "14rem", width: "14rem" }}
                key={item._id}
                id={item._id}
                onClick={() =>
                  showSelectedSubTopics({
                    id: item._id,
                    subTopic: item.subTopic,
                  })
                }
              >
                <div
                  className={`card border-secondary text-sm-left overflow-hidden ${appStyles.cursor} ${selectedItemColor}`}
                  style={{
                    maxWidth: "18rem",
                    maxHeight: "10rem",
                    height: "10rem",
                  }}
                >
                  <div className="card-header">{item.subTopic}</div>
                  <div className="card-body text-secondary">
                    <p
                      className={`card-text ${selectedItemColor}`}
                      style={{ fontSize: 12 }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return <AppLoading style={{ height: "50", width: "50" }} message={"SubTopics"} />;
};
