import React from 'react';


export default class Chat extends React.Component {
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
