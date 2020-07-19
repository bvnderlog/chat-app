import axios from 'axios';
import cn from 'classnames';
import { Form, Field, Formik } from 'formik';
import React, { useRef, useEffect } from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import routes from '../../routes';
import { actions } from '../../slices';
import InvalidFeedback from '../InvalidFeedback';


const onSubmit = (props) => async (values, formActions) => {
  const { setSubmitting, resetForm, setErrors } = formActions;

  const { modalInfo, hideModal } = props;
  const url = routes.channelPath(modalInfo.channel.id);
  const data = { attributes: { name: values.body } };

  try {
    await axios.patch(url, { data });
    resetForm();
    hideModal();
    setSubmitting(false);
  } catch (error) {
    setErrors({ body: error.message });
  }
};

const getModalInfo = (state) => state.modalInfo;

const RenameChannel = () => {
  const dispatch = useDispatch();
  const hideModal = () => dispatch(actions.modalInfo.hideModal());

  const modalInfo = useSelector(getModalInfo);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleFocus = () => inputRef.current.select();

  const form = (
    <Formik
      initialValues={{ body: modalInfo.channel.name }}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit({ hideModal, modalInfo })}
    >
      {({ errors }) => {
        const inputClasses = cn({ 'form-control': true, 'is-invalid': errors.body });
        return (
          <Form>
            <FormGroup>
              <Field
                innerRef={inputRef}
                required
                name="body"
                className={inputClasses}
                onFocus={handleFocus}
              />
              {<InvalidFeedback message={errors.body} />}
            </FormGroup>
            <input type="submit" className="btn btn-primary" value="submit" />
          </Form>
        );
      }}
    </Formik>
  );

  return (
    <Modal show={modalInfo.type === 'rename'} onHide={hideModal}>
      <Modal.Header closeButton onClick={hideModal}>
        <Modal.Title>Rename</Modal.Title>
      </Modal.Header>
      <Modal.Body>{form}</Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
