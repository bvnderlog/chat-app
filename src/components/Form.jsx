import React from 'react';
import axios from 'axios';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form as FormikForm, Field } from 'formik';

import routes from '../routes';
import UserContext from '../context';
import { actions as allActions } from '../slices';


const mapStateToProps = (state) => {
    const { currentChannelId, networkError } = state;
    return { currentChannelId, networkError };
};

const { setHasNetworkError } = allActions.network;
const actions = { setHasNetworkError };

@connect(mapStateToProps, actions)
class Form extends React.Component {
    static contextType = UserContext;

    handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(false);

        const { currentChannelId, networkError } = this.props;
        const { channelMessagesPath } = routes;

        const url = channelMessagesPath(currentChannelId);
        const data = {
            attributes: {
                channelId: currentChannelId,
                username: this.context,
                content: values.body,
            },
        };

        try {
            await axios.post(url, { data });
        } catch (error) {
            this.props.setHasNetworkError(true);
            return;
        }

        resetForm();
        if (networkError) {
            this.props.setHasNetworkError(false);
        }
    }

    render() {
        const { networkError } = this.props;
        return (
            <Formik
                initialValues={{ body: '' }}
                onSubmit={this.handleSubmit}
            >
                {
                    () => {
                        const inputClasses = cn({
                            'form-control': true,
                            'is-invalid': networkError,
                        });
                        return (
                            <div className="mt-auto">
                                <FormikForm>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <Field name="body" className={inputClasses} />
                                            <div className="d-block invalid-feedback">
                                                {networkError && 'Network error'}
                                                &nbsp;
                                            </div>
                                        </div>
                                    </div>
                                </FormikForm>
                            </div>
                        );
                    }
                }
            </Formik>
        );
    }
}

Form.propTypes = {
    networkError: PropTypes.bool,
    currentChannelId: PropTypes.number,
    setHasNetworkError: PropTypes.func,
};

export default Form;
