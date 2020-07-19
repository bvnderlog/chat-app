import axios from 'axios';
import React from 'react';
import { Form, Formik } from 'formik';
import { Modal, FormGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import routes from '../../routes';
import { actions } from '../../slices';
import InvalidFeedback from '../InvalidFeedback';

const onSubmit = (props) => async (values, formActions) => {
  const { hideModal, channelId } = props;
  const { setSubmitting, setErrors } = formActions;
  const url = routes.channelPath(channelId);

  try {
    await axios.delete(url);
    hideModal();
    setSubmitting(false);
  } catch (error) {
    setErrors({ body: error.message });
  }
};

const getModalInfo = (state) => state.modalInfo;

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const hideModal = () => dispatch(actions.modalInfo.hideModal());

  const modalInfo = useSelector(getModalInfo);
  const submitData = { hideModal, channelId: modalInfo.channel.id };

  const form = (
    <Formik onSubmit={onSubmit(submitData)} initialValues={{}}>
      {({ errors }) => (
        <Form>
          <FormGroup>
            <input className="btn btn-danger" type="submit" value="remove" />
            {<InvalidFeedback message={errors.body} />}
          </FormGroup>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal show={modalInfo.type === 'remove'} onHide={hideModal}>
      <Modal.Header closeButton onClick={hideModal}>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>
      <Modal.Body>{form}</Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
