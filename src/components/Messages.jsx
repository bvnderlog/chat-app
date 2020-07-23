import { useSelector } from 'react-redux';
import React, { useRef, useEffect } from 'react';

const getChannelMessages = (state) => {
  const { messages, channelsInfo: { currentChannelId } } = state;
  return messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );
};

const Messages = () => {
  const messages = useSelector(getChannelMessages);

  const scrollAnchor = useRef();
  useEffect(() => scrollAnchor.current.scrollIntoView({ behavior: 'smooth' }));

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.map((item) => (
        <div key={item.id}><b>{item.username}</b>: {item.content}</div>
      ))}
      <div ref={scrollAnchor} />
    </div>
  );
};

export default Messages;
