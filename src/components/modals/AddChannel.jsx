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

  const url = routes.channelsPath();
  const data = { attributes: { name: values.body } };

  try {
    await axios.post(url, { data });
    resetForm();
    props.hideModal();
    setSubmitting(false);
  } catch (error) {
    setErrors({ body: 'Network error' });
  }
};

const AddChannel = (props) => {
  const { hideModal, modalInfo } = props;

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
          onSubmit={onSubmit(props)}
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

AddChannel.propTypes = {
  hideModal: PropTypes.func,
  setModalInfo: PropTypes.func,
  modalInfo: PropTypes.object,
};

export default connect(mapStateToProps, actionMakers)(AddChannel);
