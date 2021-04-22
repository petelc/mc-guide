import React from "react";

import MessageItem from "./MessageItem";

const MessageList = ({ authUser, messages }) => (
  <div className="house__card">
    {messages.map((message) => (
      <MessageItem authUser={authUser} key={message.uid} message={message} />
    ))}
  </div>
);

export default MessageList;
