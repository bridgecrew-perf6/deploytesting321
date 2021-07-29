import React, { useEffect, useState } from "react";
import GraphResolvers from "../../lib/apollo/apiGraphStrings";
import { SitePageContainer } from "../../components/layout";
import {
  ErrorWindow,
  PollsSubTopicWindow,
  PollsTopicWindow,
} from "../../components/pageComponents/Poll/PollCtrs";
import { useLazyQuery, useQuery } from "@apollo/client";
import DataWindow from "../../components/pageComponents/Home/DataWindow";
import {
  CategoryItems,
  PollHistory,
  ISubTopic,
  ITopic,
} from "../../components/appTypes/appType";
import { filterSearchVals } from "../../components/formFuncs/miscFuncs";
import { useRouter } from "next/router";
import { useAuth } from "../../components/authProvider/authProvider";

const {
  GET_TOPICS,
  GET_SUBTOPICS,
  GET_POLLS_BY_TOPIC,
  GET_POLLS_BY_SUBTOPIC,
  GET_SUBTOPICS_PER_TOPIC,
} = GraphResolvers.queries;

const PollsHome = () => {
  const router = useRouter();
  const auth = useAuth();

  //API
  const { data: topicData } = useQuery(GET_TOPICS);
  // const { data: subTopicData } = useQuery(GET_SUBTOPICS);

  const [getPollsByTopic] = useLazyQuery(GET_POLLS_BY_TOPIC, {
    fetchPolicy: "cache-and-network",
    onCompleted: (res) => updatePollData(res.pollsByTopic),
    onError: (err) => setErrorMssg("Content Not Available for this Topic"),
  });

  const [getPollsBySubTopic] = useLazyQuery(GET_POLLS_BY_SUBTOPIC, {
    fetchPolicy: "cache-and-network",
    onCompleted: (res) => updatePollData(res.pollsBySubTopic),
    onError: (err) => setErrorMssg("Content Not Available for this Sub-Topic"),
  });

  const [getSubTopicsForTopic, { loading, data }] = useLazyQuery(
    GET_SUBTOPICS_PER_TOPIC,
    {
      fetchPolicy: "cache-and-network",
      onCompleted: (res) => {
        res.subTopicsPerTopic.length > 0
          ? prepDataList(res.subTopicsPerTopic, "Sub-Topic")
          : updateSubTopics([]);
      },
      onError: (err) => setErrorMssg("No Subtopics available for this Topic"),
    }
  );

  //State Management
  const [pollData, updatePollData] = useState<PollHistory[] | null>(null);
  // const [srchQueryVals, updateQueryVals] = useState({});
  const [errorMssg, setErrorMssg] = useState("");
  const [topics, updateTopics] = useState<CategoryItems[]>([]);
  const [subTopics, updateSubTopics] = useState<CategoryItems[]>([]);

  //Functions
  const loadPollData = (catType: string, catId: string | string[]) => {
    if (catType === "topic") {
      getPollsByTopic({ variables: { topic: catId } });

      return;
    }
    getPollsBySubTopic({ variables: { subTopic: catId } });
  };

  const prepDataList = (data: any[], dataType: string) => {
    const dataWithStatus: CategoryItems[] = data.map((item) => {
      return {
        _id: item._id,
        category: dataType === "Topic" ? item.topic : item.subTopic,
        // creator: item.creator.appid,
        description: item.description,
        active: false,
        linkedCats: item.subTopics ? item.subTopics : item.topic,
      };
    });

    const allBtn: CategoryItems = {
      _id: "All_1",
      category: "All",
      // creator: "NA",
      description: `All ${dataType}s`,
      active: true,
    };

    if (dataType === "Topic") {
      updateTopics([allBtn, ...dataWithStatus]);
      return;
    }

    updateSubTopics([allBtn, ...dataWithStatus]);
  };

  const handleTopic = (topicId: string) => {
    const activeTopics = topics.map((item) => {
      if (item._id === topicId) {
        getSubTopicsForTopic({ variables: { topic: item.category } });
        loadPollData("topic", topicId);
        const updatedSubTopics = subTopics.map((subTopic) => {
          return { ...subTopic, active: false };
        });

        updateSubTopics(updatedSubTopics);

        return { ...item, active: true };
      }
      return { ...item, active: false };
    });

    console.log("handle Topic: ", activeTopics);

    updateTopics(activeTopics);
  };

  const handleSubTopic = (subTopicId: string) => {
    const activeSubTopics = subTopics.map((item) => {
      if (item._id === subTopicId && item.category !== "All") {
        loadPollData("subTopic", subTopicId);
        const topicMatch = topics.map((topic) => {
          if (topic.category === item.linkedCats.topic) {
            return { ...topic, active: true };
          }
          return { ...topic, active: false };
        });

        updateTopics(topicMatch);

        return { ...item, active: true };
      }

      if (item._id === subTopicId && item.category === "All") {
        loadPollData("subTopic", "All_1");
        getSubTopicsForTopic({ variables: { topic: "All" } });
        const updatedTopics = topics.map((topic) => {
          if (topic.category === "All") {
            return { ...topic, active: true };
          }
          return { ...topic, active: false };
        });

        updateTopics(updatedTopics);

        return { ...item, active: true };
      }

      return { ...item, active: false };
    });

    updateSubTopics(activeSubTopics);
  };

  const searchSubTopics = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const results = filterSearchVals(
      data.subTopicsPerTopic,
      e.target.value,
      "subTopic"
    );

    results.length > 0
      ? prepDataList(results, "Sub-Topic")
      : updateSubTopics([]);
  };

  const handleActiveBtn = (activeId: string, catType: string) => {
    if (catType === "topic") {
      handleTopic(activeId);
      return;
    }

    handleSubTopic(activeId);
  };

  //Component Mounted
  useEffect(() => {
    auth?.handleSearch("");
    localStorage.removeItem("PoldIt-data");

    const { data } = router.query;
    const queryData: ISubTopic = data ? JSON.parse(data as string) : "";

    let catId: string | string[];
    let category: string;
    if (queryData && typeof queryData.topic === "string" && topicData) {
      catId = queryData._id;
      category = queryData.topic;
      handleTopic(queryData._id);
    } else {
      catId = "All_1";
      category = "All";
    }
    loadPollData("topic", catId);
    getSubTopicsForTopic({ variables: { topic: category } });
    topicData && prepDataList(topicData.topics, "Topic");
  }, [topicData, topics.length > 0]);

  useEffect(() => {
    const { data } = router.query;
    const queryData: ISubTopic = data ? JSON.parse(data as string) : "";

    if (queryData && typeof queryData.topic !== "string") {
      console.log("subTopic query triggered");
      handleSubTopic(queryData._id);
    }
  }, [subTopics.length > 0]);

  return (
    <SitePageContainer title={`Polls Home`}>
      <div style={{ marginTop: "100px" }}>
        <PollsTopicWindow data={topics} select={handleActiveBtn} />
        <PollsSubTopicWindow
          data={subTopics}
          loading={loading}
          search={searchSubTopics}
          // loadPolls={loadPollData}
          select={handleActiveBtn}
        />
        <div className="d-flex justify-content-center">
          {pollData && !errorMssg && <DataWindow data={pollData} />}
          {!pollData && errorMssg && <ErrorWindow mssg={errorMssg} />}
        </div>
      </div>
    </SitePageContainer>
  );
};

export default PollsHome;
