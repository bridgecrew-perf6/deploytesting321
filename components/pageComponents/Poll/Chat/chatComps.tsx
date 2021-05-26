import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import chatStyles from "../../../../appStyles/chatStyles.module.css";
import appStyles from "../../../../appStyles/appStyles.module.css";
import btnStyles from "../../../../appStyles/btnStyles.module.css";
import { OnChangeSearchBar } from "../../Other/NavBar/searchBar";

import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { ChatMessage, IPollChatBox, User } from "../../../appTypes/appType";
import ProfileImg from "../../Profile/profileImg";
import { filterSearchVals } from "../../../formFuncs/miscFuncs";

const { chatSideBar, chatMessage, userMessage, chatSearch, chatInput } =
  chatStyles;
const { customBtn, customBtnOutline, customBtnOutlinePrimary, answerBtn } =
  btnStyles;

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

export const ChatBody = ({
  pollId,
  appUser,
  data,
  addAnswer,
  addError,
}: IPollChatBox) => {
  return (
    <div className="d-flex flex-column border h-100" style={{ width: "90%" }}>
      <div className="border border-secondary p-2" style={{ height: "10%" }}>
        Header
      </div>
      <div className="border border-secondary flex-grow-1 p-2">
        <ChatArea pollId={pollId} appUser={appUser} data={data} />
      </div>
      <div
        className="border border-secondary pl-2 pr-2"
        style={{ height: "12%" }}
      >
        <ChatInput
          pollId={pollId}
          appUser={appUser}
          addAnswer={addAnswer}
          addError={addError}
        />
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

const ChatInput = ({ pollId, addAnswer, addError }: IPollChatBox) => {
  const [input, updateInput] = useState("");

  const [addChatMssg] = useMutation(
    GraphResolvers.mutations.CREATE_CHAT_MESSAGE,
    {}
  );

  const addChatItem = (isAnswer: boolean = false) => {
    //If isAnswer is true, use Add New Answer mutation along with chat message mutation so it updates the Answer Window above.  Client way is easier than backend way which is repetitive code

    const details = JSON.stringify({
      message: input,
      poll: pollId,
      isAnswer,
    });

    addChatMssg({
      variables: { details },
    });
    updateInput("");

    if (isAnswer && addAnswer && addError) {
      addAnswer(input, []); //Enable the ability to add images in Chat reply TBD
      addError();
    }
  };

  const handleMssgInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e as React.KeyboardEvent<HTMLInputElement>;

    if (key === "Enter" && input.length > 0) {
      e.preventDefault();
      addChatItem();
    }
  };

  return (
    <div className="d-flex h-100 flex-fill align-items-center">
      <div
        className={`input-group ${chatInput} align-items-center rounded-pill`}
      >
        <input
          type="text"
          className="form-control border border-white ml-3"
          placeholder="Chat Here"
          value={input}
          onChange={(e) => updateInput(e.target.value)}
          onKeyDown={handleMssgInput}
        />
        <div className="input-group-prepend overflow-hidden rounded-circle">
          <span
            className={`input-group-text bg-white border border-white p-1 mr-3 ${answerBtn} ${appStyles.appSecondaryTxt}`}
            id="basic-addon1"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Click to add as an answer to the poll"
            onClick={() => addChatItem(true)}
          >
            A
          </span>
        </div>
      </div>
      <div className="col-auto">
        <button
          onClick={() => {
            input.length > 0 && addChatItem();
          }}
          className={`${customBtn} ${customBtnOutline} ${customBtnOutlinePrimary}`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
