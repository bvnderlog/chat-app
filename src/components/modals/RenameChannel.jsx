import axios from 'axios';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field, Formik } from 'formik';
import React, { useRef, useEffect } from 'react';
import { Modal, FormGroup } from 'react-bootstrap';

import routes from '../../routes';
import { actions } from '../../slices';
import InvalidFeedback from '../InvalidFeedback';


const actionMakers = {
  hideModal: actions.modalInfo.hideModal,
  setModalInfo: actions.modalInfo.setModalInfo,
  setHasError: actions.modalError.setHasError,
};

const mapStateToProps = (state) => {
  const { modalInfo, modalError } = state;
  return { modalInfo, modalError };
};

const onSubmit = (props) => async (values, { setSubmitting, resetForm }) => {
  setSubmitting(false);

  const {
    modalInfo,
    setHasError,
    hideModal,
    modalError,
  } = props;
  const url = routes.channelPath(modalInfo.channel.id);
  const data = { attributes: { name: values.body } };

  try {
    await axios.patch(url, { data });
  } catch (error) {
    setHasError(true);
    return;
  }

  resetForm();
  if (modalError) {
    setHasError(false);
  }

  hideModal();
};

const RenameChannel = (props) => {
  const { modalInfo, modalError, hideModal } = props;
  const inputClasses = cn({ 'form-control': true, 'is-invalid': modalError });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleFocus = () => inputRef.current.select();

  const form = (
    <Formik
      initialValues={{ body: modalInfo.channel.name }}
      onSubmit={onSubmit(props)}
    >
      <Form>
        <FormGroup>
          <Field
            innerRef={inputRef}
            required
            name="body"
            className={inputClasses}
            onFocus={handleFocus}
          />
          {modalError && <InvalidFeedback />}
        </FormGroup>
        <input type="submit" className="btn btn-primary" value="submit" />
      </Form>
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

RenameChannel.propTypes = {
  hideModal: PropTypes.func,
  setModalInfo: PropTypes.func,
  modalError: PropTypes.bool,
  modalInfo: PropTypes.object,
};

export default connect(mapStateToProps, actionMakers)(RenameChannel);
