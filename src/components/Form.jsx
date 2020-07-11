import axios from 'axios';
import cn from 'classnames';
import { connect } from 'react-redux';
import { FormGroup } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field } from 'formik';
import React, { useContext, useRef, useEffect } from 'react';

import routes from '../routes';
import UserContext from '../context';
import InvalidFeedback from './InvalidFeedback';


const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

const handleSubmit = (props) => async (values, actions) => {
  const { setSubmitting, resetForm, setErrors } = actions;

  const { currentChannelId, username } = props;

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
    setErrors({ body: 'Network error' });
    return;
  }

  resetForm();
  setSubmitting(false);
};

const Form = (props) => {
  const username = useContext(UserContext);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Formik
      enableReinitialize={false}
      initialValues={{ body: '' }}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit({ ...props, username })}
    >
      {({ errors }) => {
        const inputError = errors.body;
        const inputClasses = cn({ 'form-control': true, 'is-invalid': inputError });
        return (
          <div className="mt-auto">
            <FormikForm>
              <FormGroup>
                <Field innerRef={inputRef} name="body" className={inputClasses} />
                {<InvalidFeedback message={inputError} />}
              </FormGroup>
            </FormikForm>
          </div>
        );
      }}
    </Formik>
  );
};

export default connect(mapStateToProps)(Form);
