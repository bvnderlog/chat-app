import React from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import routes from '../routes.js';
import UserContext from './context.js';


const mapStateToProps = (state) => {
    const { messages, currentChannelId } = state;
    const activeChannelMessages = messages.filter(
        ({ channelId }) => channelId === currentChannelId,
    );
    return { messages: activeChannelMessages, currentChannelId };
};

class Chat extends React.Component {
    static contextType = UserContext;

    handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        resetForm();

        const { currentChannelId } = this.props;
        const { channelMessagesPath } = routes;

        const url = channelMessagesPath(currentChannelId);
        const data = {
            attributes: {
                channelId: currentChannelId,
                username: this.context,
                content: values.body,
            }
        };

        await axios.post(url, { data });
    }

    renderForm() {
        return (
            <Formik
                initialValues={{ body: '' }}
                onSubmit={this.handleSubmit}
            >
                {(formik) => (
                    <div className="mt-auto">
                        <form onSubmit={formik.handleSubmit} noValidate="" className="">
                            <div className="form-group">
                                <div className="input-group">
                                    <input
                                        id="body"
                                        { ...formik.getFieldProps('body') }
                                        className="form-control"
                                    />
                                    <div className="d-block invalid-feedback">&nbsp;</div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </Formik>
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
