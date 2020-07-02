import axios from 'axios';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useContext } from 'react';
import { FormGroup } from 'react-bootstrap';
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

const handleSubmit = (props) => async (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    const { currentChannelId, networkError, username } = props;
    const { channelMessagesPath } = routes;

    const url = channelMessagesPath(currentChannelId);
    const data = {
        attributes: {
            channelId: currentChannelId,
            content: values.body,
            username,
        },
    };

    try {
        await axios.post(url, { data });
    } catch (error) {
        props.setHasNetworkError(true);
        return;
    }

    resetForm();
    if (networkError) {
        props.setHasNetworkError(false);
    }
};

const Form = (props) => {
    const username = useContext(UserContext);
    return (
        <Formik
            initialValues={{ body: '' }}
            onSubmit={handleSubmit({ ...props, username })}
        >
            {
                () => {
                    const inputClasses = cn({
                        'form-control': true,
                        'is-invalid': props.networkError,
                    });
                    return (
                        <div className="mt-auto">
                            <FormikForm>
                                <FormGroup>
                                    <Field name="body" className={inputClasses} />
                                    <div className="d-block invalid-feedback">
                                        {props.networkError && 'Network error'}
                                                &nbsp;
                                    </div>
                                </FormGroup>
                            </FormikForm>
                        </div>
                    );
                }
            }
        </Formik>
    );
};

Form.propTypes = {
    networkError: PropTypes.bool,
    currentChannelId: PropTypes.number,
    setHasNetworkError: PropTypes.func,
};

export default connect(mapStateToProps, actions)(Form);
