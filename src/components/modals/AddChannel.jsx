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

  const { modalError, setHasError, hideModal } = props;
  const url = routes.channelsPath();
  const data = { attributes: { name: values.body } };

  try {
    await axios.post(url, { data });
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

const AddChannel = (props) => {
  const { modalError, hideModal, modalInfo } = props;
  const inputClasses = cn({
    'form-control': true,
    'is-invalid': modalError,
  });

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
          onSubmit={onSubmit(props)}
        >
          <Form>
            <FormGroup>
              <Field innerRef={inputRef} required name="body" className={inputClasses} />
              { modalError && <InvalidFeedback />}
            </FormGroup>
            <input type="submit" className="btn btn-primary" value="submit" />
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

AddChannel.propTypes = {
  hideModal: PropTypes.func,
  setModalInfo: PropTypes.func,
  modalError: PropTypes.bool,
  modalInfo: PropTypes.object,
};

export default connect(mapStateToProps, actionMakers)(AddChannel);
