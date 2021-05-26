import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import chatStyles from "../../../../appStyles/chatStyles.module.css";
import { IPollChatBox, ChatMessage, User } from "../../../appTypes/appType";
import { useAuth } from "../../../authProvider/authProvider";
import { ChatBody, ChatSideBar } from "./chatComps";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import AppLoading from "../../Other/Loading";

const { chatWindow } = chatStyles;

const PollChatBox = ({ pollId, addAnswer, addError }: IPollChatBox) => {
  const appContext = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [chatUsers, setChatUsers] = useState<User[]>([]);

  const { loading, error, data, subscribeToMore } = useQuery(
    GraphResolvers.queries.GET_POLL_CHATS,
    { variables: { pollId } }
  );

  const [getUser, { data: userData }] = useLazyQuery(
    GraphResolvers.queries.GET_USER
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
    getUser();
    userData && setUser(userData!.getUserData!.user);

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
  }, [data, userData]);

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
    <div className={`alert alert-light ${chatWindow} d-flex flex-row`}>
      <ChatSideBar
        pollId={pollId}
        appUser={user}
        userList={uniqueCreators}
        currentUsers={chatUsers}
        updateUsers={setChatUsers}
      />
      <ChatBody
        pollId={pollId}
        appUser={user}
        data={data!.messagesByPoll}
        addAnswer={addAnswer}
        addError={addError}
      />
    </div>
  );
};

export default PollChatBox;
