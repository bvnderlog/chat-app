import React from 'react';
import { connect } from 'react-redux';
import UserContext from './context.js';


const mapStateToProps = (state) => {
    const { messages, currentChannelId } = state;
    const activeChannelMessages = messages.filter(
        ({ channelId }) => channelId === currentChannelId,
    );
    return { messages: activeChannelMessages };
};

class Chat extends React.Component {
    static contextType = UserContext;

    renderForm() {
        const { inputText, onFormSubmit, onFormChange } = this.props;
        return (
            <div className="mt-auto">
                <form onSubmit={onFormSubmit} noValidate="" className="">
                    <div className="form-group">
                        <div className="input-group">
                            <input
                                onChange={onFormChange}
                                name="body"
                                className="form-control"
                                value={inputText}
                            />
                            <div className="d-block invalid-feedback">&nbsp;</div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    render() {
        const { messages } = this.props;
        return (
            <div className="col h-100">
                <div className="d-flex flex-column h-100">
                    <div id="messages-box" className="chat-messages overflow-auto mb-3">
                        {
                            messages.map((message) => {
                                const { username, content, id } = message;
                                return <div key={id}><b>{username}</b>: {content}</div>;
                            })
                        }
                    </div>
                    {this.renderForm()}
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps)(Chat);
