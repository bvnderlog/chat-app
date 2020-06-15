import React from 'react';
import Form from './Form.jsx';


export default class Chat extends React.Component {
    render() {
        const { messages, currentChannelId } = this.props;
        return (
            <div className="col h-100">
                <div className="d-flex flex-column h-100">
                    <div id="messages-box" className="chat-messages overflow-auto mb-3">
                        {
                            messages.map((message) => {
                                const { username, content } = message;
                                return <div><b>{username}</b>: {content}</div>;
                            })
                        }
                    </div>
                    <Form currentChannelId={currentChannelId} />
                </div>
            </div>
        );
    }
}
