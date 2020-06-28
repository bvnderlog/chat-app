import React from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import routes from '../routes.js';
import UserContext from '../context.js';


const mapStateToProps = (state) => {
    const { currentChannelId } = state;
    return { currentChannelId };
};

@connect(mapStateToProps)
export default class Form extends React.Component {
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

    render() {
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
}
