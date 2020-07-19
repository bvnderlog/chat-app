import axios from 'axios';
import cn from 'classnames';
import { Form, Field, Formik } from 'formik';
import React, { useRef, useEffect } from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import routes from '../../routes';
import { actions } from '../../slices';
import InvalidFeedback from '../InvalidFeedback';

const onSubmit = (hideModal) => async (values, formActions) => {
  const { setSubmitting, resetForm, setErrors } = formActions;

  const url = routes.channelsPath();
  const data = { attributes: { name: values.body } };

  try {
    await axios.post(url, { data });
    resetForm();
    hideModal();
    setSubmitting(false);
  } catch (error) {
    setErrors({ body: error.message });
  }
};

const getModalInfo = (state) => state.modalInfo;

const AddChannel = () => {
  const dispatch = useDispatch();
  const hideModal = () => dispatch(actions.modalInfo.hideModal());

  const modalInfo = useSelector(getModalInfo);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Modal show={modalInfo.type === 'add'} onHide={hideModal}>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{ body: '' }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={onSubmit(hideModal)}
        >
          {({ errors }) => {
            const inputClasses = cn({
              'form-control': true,
              'is-invalid': errors.body,
            });
            return (
              <Form>
                <FormGroup>
                  <Field innerRef={inputRef} required name="body" className={inputClasses} />
                  {<InvalidFeedback message={errors.body} />}
                </FormGroup>
                <input type="submit" className="btn btn-primary" value="submit" />
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
