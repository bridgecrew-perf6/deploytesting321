import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import chatStyles from "../../../../appStyles/chatStyles.module.css";
import btnStyles from "../../../../appStyles/btnStyles.module.css";
import { OnChangeSearchBar } from "../../Other/NavBar/searchBar";

import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { ChatMessage, IPollChatBox, User } from "../../../appTypes/appType";
import ProfileImg from "../../Profile/profileImg";
import { filterSearchVals } from "../../../formFuncs/miscFuncs";

const { chatSideBar, chatMessage, userMessage, chatSearch } = chatStyles;
const { customBtn, customBtnOutline, customBtnOutlinePrimary } = btnStyles;

export const ChatSideBar = ({
  pollId,
  appUser,
  userList,
  currentUsers,
  updateUsers,
}: IPollChatBox) => {
  const searchHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (userList && currentUsers && updateUsers) {
      const results = filterSearchVals(userList, e.target.value, "appid");
      results && updateUsers(results);
    }
  };

  return (
    <div className={`d-flex flex-column ${chatSideBar}`}>
      <div
        className="d-flex align-items-center justify-content-center border-bottom"
        style={{ height: "9%" }}
      >
        Poll Participants
      </div>
      <div className="d-flex flex-column justify-content-between h-100">
        <div
          className={`d-flex justify-content-center p-1 rounded ${chatSearch}`}
        >
          <OnChangeSearchBar search={searchHandler} style={{ width: "98%" }} />
        </div>
        <div className="flex-fill list-group overflow-auto p-2">
          {currentUsers?.map((item) => (
            <div key={item._id}>
              <ChatUser user={item} />
            </div>
          ))}
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "11%" }}
        >
          Footer
        </div>
      </div>
    </div>
  );
};

interface ChatSideBarUser {
  user: User;
}

export const ChatUser = ({ user }: ChatSideBarUser) => {
  return (
    <div className="list-group-item m-1 p-1 d-flex align-items-center rounded">
      <ProfileImg
        profilePic={user.profilePic}
        picStyle={{ height: 40, width: 40 }}
        color="gray"
      />
      <div className="ml-2">{user.appid}</div>
    </div>
  );
};

export const ChatBody = ({ pollId, appUser, data }: IPollChatBox) => {
  return (
    <div className="d-flex flex-column border h-100" style={{ width: "90%" }}>
      <div className="border border-secondary p-2" style={{ height: "10%" }}>
        Header
      </div>
      <div className="border border-secondary flex-grow-1 p-2">
        <ChatArea pollId={pollId} appUser={appUser} data={data} />
      </div>
      <div className="border border-secondary p-2" style={{ height: "12%" }}>
        <ChatInput pollId={pollId} appUser={appUser} />
      </div>
    </div>
  );
};

const ChatArea = ({ pollId, appUser, data }: IPollChatBox) => {
  if (data && data.length === 0) {
    return <div>No one is chatting. Start the conversation</div>;
  }

  return (
    <div
      className="d-flex flex-column"
      style={{ height: "39vh", overflow: "auto" }}
    >
      {data!.map((item: ChatMessage) => (
        <div key={item._id}>
          <ChatItem data={item} userId={appUser?._id} />
        </div>
      ))}
    </div>
  );
};

interface ChatItem {
  data: ChatMessage;
  userId: string | undefined;
}

const ChatItem = ({ data, userId }: ChatItem) => {
  useEffect(() => {}, []);

  let userMsgCtrPosition: string;
  let userMsgBox: string;
  let userMsgTxt: string;

  if (userId === data.creator._id) {
    userMsgCtrPosition = "align-items-end";
    userMsgBox = chatMessage;
    userMsgTxt = "text-white text-right";
  } else {
    userMsgCtrPosition = "align-items-start";
    userMsgBox = userMessage;
    userMsgTxt = "text-dark text-left";
  }

  return (
    <div id={data._id} className="m-2 mr-3">
      <div className={`d-flex flex-column ${userMsgCtrPosition}`}>
        <div className={`${userMsgTxt} rounded p-2 ${userMsgBox}`}>
          {data.message}
        </div>
        {userId !== data.creator._id ? (
          <div className="" style={{ fontSize: 14, marginTop: 10 }}>
            {`${data.creator.appid}:`}{" "}
            <TimeAgo date={data.creationDate} live={false} />
          </div>
        ) : (
          <TimeAgo
            date={data.creationDate}
            live={false}
            style={{ fontSize: 14, marginTop: 10 }}
          />
        )}
      </div>
    </div>
  );
};

const ChatInput = ({ pollId }: IPollChatBox) => {
  const [input, updateInput] = useState("");

  const [addChatMssg] = useMutation(
    GraphResolvers.mutations.CREATE_CHAT_MESSAGE,
    {}
  );

  const addChatItem = () => {
    const details = JSON.stringify({
      message: input,
      poll: pollId,
    });

    addChatMssg({
      variables: { details },
    });
    updateInput("");
  };

  const handleMssgInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e as React.KeyboardEvent<HTMLInputElement>;

    if (key === "Enter" && input.length > 0) {
      e.preventDefault();
      addChatItem();
    }
  };

  return (
    <div className="w-100 form-row d-flex justify-content-between">
      <div className="col-10">
        <input
          type="text"
          value={input}
          onChange={(e) => updateInput(e.target.value)}
          className="form-control"
          placeholder="Chat Here"
          onKeyDown={handleMssgInput}
        />
      </div>
      <div className="col-auto">
        <button
          onClick={() => addChatItem()}
          className={`${customBtn} ${customBtnOutline} ${customBtnOutlinePrimary}`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
