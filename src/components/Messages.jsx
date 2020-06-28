import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    const { messages, currentChannelId } = state;
    const activeChannelMessages = messages.filter(
        ({ channelId }) => channelId === currentChannelId,
    );
    return { messages: activeChannelMessages };
};

const renderMessage = (message) => {
    const { username, content, id } = message;
    return <div key={id}><b>{username}</b>: {content}</div>;
};

const Messages = (props) => (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
        {props.messages.map(renderMessage)}
    </div>
);

Messages.propTypes = { messages: PropTypes.array };

export default connect(mapStateToProps)(Messages);
