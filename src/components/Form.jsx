import axios from 'axios';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field } from 'formik';
import React, { useContext, useRef, useEffect } from 'react';

import routes from '../routes';
import { actions } from '../slices';
import UserContext from '../context';
import InvalidFeedback from './InvalidFeedback';


const mapStateToProps = (state) => {
  const { currentChannelId, formError } = state;
  return { currentChannelId, formError };
};

const actionMakers = {
  setHasError: actions.formError.setHasError,
};

const handleSubmit = (props) => async (values, { setSubmitting, resetForm }) => {
  setSubmitting(false);

  const {
    currentChannelId,
    formError,
    username,
    setHasError,
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
    setHasError(true);
    return;
  }

  resetForm();
  if (formError) {
    setHasError(false);
  }
};

const Form = (props) => {
  const { formError } = props;
  const username = useContext(UserContext);
  const inputClasses = cn({
    'form-control': true,
    'is-invalid': formError,
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={handleSubmit({ ...props, username })}
    >
      <div className="mt-auto">
        <FormikForm>
          <FormGroup>
            <Field innerRef={inputRef} name="body" className={inputClasses} />
            { formError && <InvalidFeedback />}
          </FormGroup>
        </FormikForm>
      </div>
    </Formik>
  );
};

Form.propTypes = { formError: PropTypes.bool };

export default connect(mapStateToProps, actionMakers)(Form);
