import React from "react";

const MessageItem = ({ authUser, message }) => (
  <>
    <h5 className="house__card__title">
      <strong>{message.userId}</strong>
    </h5>
    <div className="house__card__text">{message.text}</div>
  </>
);

export default MessageItem;
