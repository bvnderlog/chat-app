import axios from 'axios';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useContext } from 'react';
import { FormGroup } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field } from 'formik';

import routes from '../routes';
import { actions } from '../slices';
import UserContext from '../context';


const mapStateToProps = (state) => {
    const { currentChannelId, networkError } = state;
    return { currentChannelId, networkError };
};

const actionMakers = {
    setHasNetworkError: actions.networkError.setHasNetworkError,
};

const handleSubmit = (props) => async (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    const {
        currentChannelId,
        networkError,
        username,
        setHasNetworkError,
    } = props;

    const url = routes.channelMessagesPath(currentChannelId);
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
        setHasNetworkError(true);
        return;
    }

    resetForm();
    if (networkError) {
        setHasNetworkError(false);
    }
};

const Form = (props) => {
    const username = useContext(UserContext);
    const inputClasses = cn({
        'form-control': true,
        'is-invalid': props.networkError,
    });

    return (
        <Formik
            initialValues={{ body: '' }}
            onSubmit={handleSubmit({ ...props, username })}
        >
            <div className="mt-auto">
                <FormikForm>
                    <FormGroup>
                        <Field name="body" className={inputClasses} />
                        <div className="d-block invalid-feedback">
                            {props.networkError && 'Network error'}&nbsp;
                        </div>
                    </FormGroup>
                </FormikForm>
            </div>
        </Formik>
    );
};

Form.propTypes = { networkError: PropTypes.bool };

export default connect(mapStateToProps, actionMakers)(Form);
