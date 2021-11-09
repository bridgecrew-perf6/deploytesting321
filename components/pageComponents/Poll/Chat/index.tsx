import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import chatStyles from "../../../../appStyles/chatStyles.module.css";
import pollStyles from "../../../../appStyles/pollStyles.module.css";
import { IPollChatBox, ChatMessage, User } from "../../../appTypes/appType";
import { useAuth } from "../../../authProvider/authProvider";
import { ChatBody, ChatSideBar } from "./chatComps";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import AppLoading from "../../Other/Loading";
import { AnsComp } from "./AnsComp";

const PollChatBox = ({
  pollId,
  addAnswer,
  addError,
  showSection,
  user,
}: IPollChatBox) => {
  const [chatUsers, setChatUsers] = useState<User[]>([]);

  const { loading, error, data, subscribeToMore } = useQuery(
    GraphResolvers.queries.GET_POLL_CHATS,
    { variables: { pollId } }
  );

  const creators = data?.messagesByPoll.map((item: { creator: User }) => {
    return JSON.stringify({
      _id: item.creator._id,
      appid: item.creator.appid,
      profilePic: item.creator.profilePic,
    });
  });

  const uniqueCreators = creators
    ?.filter((val: string, idx: number) => creators.indexOf(val) === idx)
    .map((item: string) => JSON.parse(item));

  useEffect(() => {
    if (data) {
      uniqueCreators && setChatUsers(uniqueCreators);
      subscribeToMore({
        document: GraphResolvers.subscriptions.CHAT_SUBSCRIPTION,
        variables: { pollId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const newChatItem = subscriptionData.data.newMessage;
          return Object.assign({}, prev, {
            messagesByPoll: [...prev.messagesByPoll, newChatItem],
          });
        },
      });

      const chatItem: ChatMessage =
        data.messagesByPoll[data.messagesByPoll.length - 1];

      const listItem = chatItem && document.getElementById(chatItem._id);
      listItem?.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center alert alert-light"
        style={{ height: "50vh", margin: "1.5vh" }}
      >
        <AppLoading
          style={{ height: "40vh", width: "40vh" }}
          message="Chat Area"
        />
      </div>
    );
  }

  return (
    <div
      className="alert alert-light d-flex flex-column align-items-center mb-3"
      style={{ margin: "1.5vh" }}
    >
      <h5 className={`${pollStyles.pollHeaderTxt}`}>POLL CHAT</h5>
      {!showSection && (
        <div className={`d-flex flex-row w-100 mt-2`}>
          <div style={{maxHeight: '800px'}}>
            <ChatSideBar
              pollId={pollId}
              appUser={user}
              userList={uniqueCreators}
              currentUsers={chatUsers}
              updateUsers={setChatUsers}
            />
          </div>
          <ChatBody
            pollId={pollId}
            appUser={user}
            pollUsers={chatUsers}
            data={data!.messagesByPoll}
            addAnswer={addAnswer}
            addError={addError}
          />
        </div>
      )}
    </div>
  );
};

export default PollChatBox;
