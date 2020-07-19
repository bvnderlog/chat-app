import axios from 'axios';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { FormGroup } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field } from 'formik';
import React, { useContext, useRef, useEffect } from 'react';

import routes from '../routes';
import UserContext from '../context';
import InvalidFeedback from './InvalidFeedback';


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
    resetForm();
    setSubmitting(false);
  } catch (error) {
    setErrors({ body: error.message });
  }
};

const getCurrentChannelId = (state) => state.currentChannelId;

const Form = () => {
  const username = useContext(UserContext);
  const currentChannelId = useSelector(getCurrentChannelId);

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
      onSubmit={handleSubmit({ currentChannelId, username })}
    >
      {({ errors }) => {
        const inputClasses = cn({ 'form-control': true, 'is-invalid': errors.body });
        return (
          <div className="mt-auto">
            <FormikForm>
              <FormGroup>
                <Field innerRef={inputRef} required name="body" className={inputClasses} />
                {<InvalidFeedback message={errors.body} />}
              </FormGroup>
            </FormikForm>
          </div>
        );
      }}
    </Formik>
  );
};

export default Form;
