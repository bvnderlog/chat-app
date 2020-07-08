import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useRef, useEffect } from 'react';


const mapStateToProps = (state) => {
  const { messages, currentChannelId } = state;
  const activeChannelMessages = messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );
  return { messages: activeChannelMessages };
};

const Messages = (props) => {
  const scrollAnchor = useRef();
  useEffect(() => scrollAnchor.current.scrollIntoView({ behavior: 'smooth' }));

  return (
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
            {props.messages.map((item) => (
                <div key={item.id}><b>{item.username}</b>: {item.content}</div>
            ))}
            <div ref={scrollAnchor} />
        </div>
  );
};

Messages.propTypes = { messages: PropTypes.array };

export default connect(mapStateToProps)(Messages);
