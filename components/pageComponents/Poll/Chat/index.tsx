import React from "react";
import chatStyles from "../../../../appStyles/chatStyles.module.css";
import { User, IPollChatBox } from "../../../appTypes/appType";
import { useAuth } from "../../../authProvider/authProvider";
import { ChatBody, ChatSideBar } from "./chatComps";

const { chatWindow } = chatStyles;

const PollChatBox = ({ pollId }: IPollChatBox) => {
  const appContext = useAuth();
  const _id = appContext!.authState!.user;

  return (
    <div className={`alert alert-light ${chatWindow} d-flex flex-row`}>
      <ChatSideBar pollId={pollId} userId={_id} />
      <ChatBody pollId={pollId} userId={_id} />
    </div>
  );
};

export default PollChatBox;
