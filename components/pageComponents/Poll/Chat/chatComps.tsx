import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import chatStyles from "../../../../appStyles/chatStyles.module.css";
import btnStyles from "../../../../appStyles/btnStyles.module.css";
import { IChat } from "../../../../graphql/resolvers/shared/other";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { ChatMessage, IPollChatBox } from "../../../appTypes/appType";
import AppLoading from "../../Other/Loading";

const { chatSideBar, chatMessage } = chatStyles;
const { customBtn, customBtnOutline, customBtnOutlinePrimary } = btnStyles;

export const ChatSideBar = ({ pollId, userId }: IPollChatBox) => {
  return <div className={`border border-primary ${chatSideBar}`}>Test</div>;
};

export const ChatBody = ({ pollId, userId }: IPollChatBox) => {
  return (
    <div className="d-flex flex-column border h-100" style={{ width: "90%" }}>
      <div className="border border-secondary p-2" style={{ height: "10%" }}>
        Header
      </div>
      <div className="border border-secondary flex-grow-1 p-2">
        <ChatArea pollId={pollId} userId={userId} />
      </div>
      <div className="border border-secondary p-2" style={{ height: "12%" }}>
        <ChatInput pollId={pollId} userId={userId} />
      </div>
    </div>
  );
};

const ChatArea = ({ pollId, userId }: IPollChatBox) => {
  const { loading, error, data } = useQuery(
    GraphResolvers.queries.GET_POLL_CHATS,
    { variables: { pollId } }
  );

  useEffect(() => {
    const chatItem: ChatMessage =
      data && data!.messagesByPoll[data!.messagesByPoll.length - 1];

    const listItem = chatItem && document.getElementById(chatItem._id);
    listItem?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  if (loading) {
    return (
      <div className="d-flex h-100 justify-content-center align-items-center">
        <div>
          <AppLoading
            style={{ height: "40vh", width: "40vh" }}
            message="Chat Area"
          />
        </div>
      </div>
    );
  }

  if (data && data.messagesByPoll.length === 0) {
    return <div>No one is chatting. Start the conversation</div>;
  }

  return (
    <div
      className="d-flex flex-column"
      style={{ height: "39vh", overflow: "auto" }}
    >
      {data.messagesByPoll.map((item: ChatMessage) => (
        <ChatItem data={item} userId={userId} />
      ))}
    </div>
  );
};

interface ChatItem {
  data: ChatMessage;
  userId: string | undefined;
}

const ChatItem = ({ data, userId }: ChatItem) => {
  const userIdMatch = userId === data.creator._id;

  return (
    <div
      key={data._id}
      id={data._id}
      className="d-flex flex-column align-self-end align-items-end m-2 mr-3"
    >
      <div className={`text-white text-right rounded p-2 ${chatMessage}`}>
        {data.message}
      </div>
      <TimeAgo
        date={data.creationDate}
        live={false}
        style={{ fontSize: 14, marginTop: 10 }}
      />
    </div>
  );
};

const ChatInput = ({ pollId }: IPollChatBox) => {
  const [input, updateInput] = useState("");

  const [addChatMssg] = useMutation(
    GraphResolvers.mutations.CREATE_CHAT_MESSAGE
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
