import React from 'react';
import axios from 'axios';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form as FormikForm, Field } from 'formik';

import routes from '../routes';
import UserContext from '../context';


const mapStateToProps = (state) => {
    const { currentChannelId } = state;
    return { currentChannelId };
};

@connect(mapStateToProps)
class Form extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            hasNetworkError: false,
        };
    }

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
            },
        };

        const response = await axios.post(url, { data });
        if (response.status !== 200) {
            this.setState({ hasNetworkError: true });
        }
    }

    validate = () => (this.state.hasNetworkError ? { body: 'Network error' } : {});

    render() {
        return (
            <Formik
                initialValues={{ body: '' }}
                onSubmit={this.handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={this.validate}
            >
                {
                    ({ errors, touched }) => {
                        const errorExists = errors.body && touched.body;
                        const inputClasses = cn({
                            'form-control': true,
                            'is-invalid': errorExists,
                        });
                        return (
                            <div className="mt-auto">
                                <FormikForm>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <Field name="body" className={inputClasses} />
                                            <div className="d-block invalid-feedback">
                                                {errorExists && errors.body}
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

Form.propTypes = { currentChannelId: PropTypes.number };

export default Form;
