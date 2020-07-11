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
};

const mapStateToProps = (state) => {
  const { modalInfo } = state;
  return { modalInfo };
};

const onSubmit = (props) => async (values, formActions) => {
  const { setSubmitting, resetForm, setErrors } = formActions;

  const { modalInfo, hideModal } = props;
  const url = routes.channelPath(modalInfo.channel.id);
  const data = { attributes: { name: values.body } };

  try {
    await axios.patch(url, { data });
  } catch (error) {
    setErrors({ body: 'Network error' });
    return;
  }

  resetForm();
  hideModal();
  setSubmitting(false);
};

const RenameChannel = (props) => {
  const { modalInfo, hideModal } = props;

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
      onSubmit={onSubmit(props)}
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

RenameChannel.propTypes = {
  hideModal: PropTypes.func,
  setModalInfo: PropTypes.func,
  modalInfo: PropTypes.object,
};

export default connect(mapStateToProps, actionMakers)(RenameChannel);
